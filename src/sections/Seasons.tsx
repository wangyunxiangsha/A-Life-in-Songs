import { useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { chapters, siteConfig, resolveChapterVideo } from '@/content/config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AudioPlayer from './AudioPlayer';

gsap.registerPlugin(ScrollTrigger);

function parseChapterHeading(title: string): { era: string | null; song: string } {
  const parts = title.split(' · ').filter(Boolean);
  const displayParts = parts[0]?.includes('章') ? parts.slice(1) : parts;
  if (displayParts.length >= 2) {
    return { era: displayParts[0], song: displayParts.slice(1).join(' · ') };
  }
  return { era: null, song: displayParts.join(' · ') };
}

export default function Seasons() {
  const { setChapter, setVideoSrc } = useApp();
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        onLeaveBack: () => setVideoSrc(siteConfig.introVideo),
      });

      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const chapter = chapters[i];

        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter:     () => { setChapter(chapter.id); setVideoSrc(resolveChapterVideo(chapter.id, chapter.video ?? '')); },
          onEnterBack: () => { setChapter(chapter.id); setVideoSrc(resolveChapterVideo(chapter.id, chapter.video ?? '')); },
        });

        const panel = el.querySelector('.season-panel');
        if (panel) {
          gsap.fromTo(panel,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 1, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none none' },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [setChapter, setVideoSrc]);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div className="text-center px-[5vw] py-24 lg:py-32">
        <h2
          className="font-display text-white"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '0.1em' }}
        >
          {siteConfig.seasonsSectionTitle}
        </h2>
      </div>

      {chapters.map((chapter, i) => {
        const heading = parseChapterHeading(chapter.title);
        return (
        <div
          key={chapter.id}
          ref={(el) => { chapterRefs.current[i] = el; }}
          className="relative min-h-[100dvh] flex items-center justify-center px-[5vw] py-[clamp(4rem,12vh,8rem)] mb-[clamp(2rem,8vh,5rem)]"
        >
          <div
            className={`season-panel glass-panel glass-panel-${chapter.id} relative max-w-2xl w-full p-8 lg:p-12 opacity-0`}
            style={{
              borderLeft: `3px solid ${chapter.color}`,
              ['--chapter-tint' as string]: chapter.glassBg,
            }}
          >
            <h3
              className="font-card-display font-card-heading text-white mb-6"
              style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)' }}
            >
              {heading.era ? (
                <>
                  <span className="font-card-era">{heading.era}</span>
                  <span className="font-card-heading-sep" aria-hidden> · </span>
                  <span className="font-card-song">{heading.song}</span>
                </>
              ) : (
                <span className="font-card-song">{heading.song}</span>
              )}
            </h3>

            {chapter.character && (
              <div
                className="flex items-center gap-4 mb-6 pb-6"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div
                  className="relative flex-shrink-0 overflow-hidden"
                  style={{
                    width: 'clamp(72px, 12vw, 96px)',
                    height: 'clamp(90px, 15vw, 120px)',
                    borderRadius: '3px',
                    border: `1.5px solid ${chapter.color}66`,
                    boxShadow: `0 4px 20px ${chapter.color}22`,
                    background: chapter.character.visualGradient,
                  }}
                >
                  <img
                    src={chapter.character.image}
                    alt={chapter.character.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-card-name text-white" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)' }}>
                    {chapter.character.name}
                    <span className="ml-2" style={{ fontSize: '0.85em' }}>{chapter.character.emoji}</span>
                  </p>
                  <p
                    className="font-card-role mt-1.5"
                    style={{ fontSize: 'clamp(0.68rem, 1.1vw, 0.78rem)', color: chapter.color }}
                  >
                    {chapter.character.role}
                  </p>
                  <p className="font-card-caption mt-2 text-white/85" style={{ fontSize: 'clamp(0.82rem, 1.2vw, 0.92rem)' }}>
                    {chapter.character.desc}
                  </p>
                </div>
              </div>
            )}

            <p
              className="font-card-prose font-card-prose--story text-white"
              style={{ fontSize: 'clamp(1rem, 1.55vw, 1.12rem)' }}
            >
              {chapter.story}
            </p>

            <AudioPlayer src={chapter.audio} color={chapter.color} />
          </div>
        </div>
        );
      })}
    </section>
  );
}
