import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { chapters, siteConfig } from '@/content/config';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getActiveKey, playExclusive, stopExclusive, subscribe } from '@/lib/audioManager';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const CARDS_PER_PAGE = 6;
const CARD_SIZE = 128;
const BOTTOM_H = 108;
const CARD_PAD = 10;
const CARD_W = CARD_SIZE + CARD_PAD * 2;
const CARD_IMG_H = Math.round(CARD_SIZE * 1.15);
const CARD_TEXT_FONT = "'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif";

const totalPages = Math.ceil(chapters.length / CARDS_PER_PAGE);

function cardThumb(fullPng: string): string {
  const match = fullPng.match(/\/images\/ch(\d{2})\.png$/);
  return match ? `/images/thumbs/ch${match[1]}.webp` : fullPng;
}

function VoiceButton({ src, color }: { src: string; color: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [shouldLoadAudio, setShouldLoadAudio] = useState(false);
  const audioSrc = useMemo(() => (src ? encodeURI(src) : ''), [src]);
  const audioKey = useMemo(() => `voice:${src}`, [src]);

  const handleStop = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    stopExclusive(audioKey);
  }, [audioKey]);

  useEffect(() => {
    return subscribe(() => {
      if (getActiveKey() !== audioKey) {
        audioRef.current?.pause();
        setPlaying(false);
      }
    });
  }, [audioKey]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!shouldLoadAudio) {
      setShouldLoadAudio(true);
      return;
    }
    const a = audioRef.current;
    if (!a || !canPlay) return;

    if (playing) {
      handleStop();
    } else {
      playExclusive(audioKey, handleStop);
      a.currentTime = 0;
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {
          stopExclusive(audioKey);
          setPlaying(false);
        });
    }
  };

  if (!src) return null;

  return (
    <div className="flex flex-col items-center gap-1" onClick={e => e.stopPropagation()}>
      {shouldLoadAudio && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onCanPlay={() => setCanPlay(true)}
          onEnded={handleStop}
        />
      )}
      <button
        onClick={toggle}
        disabled={shouldLoadAudio && !canPlay}
        className="relative flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          width: '36px', height: '36px',
          background: canPlay
            ? `radial-gradient(circle, ${color}44 0%, ${color}18 60%, transparent 100%)`
            : 'rgba(0,0,0,0.04)',
          border: `1.5px solid ${canPlay ? color + 'bb' : 'rgba(0,0,0,0.1)'}`,
          color: canPlay ? '#444' : '#ccc',
          cursor: canPlay ? 'pointer' : 'default',
          boxShadow: playing ? `0 0 12px ${color}88` : canPlay ? `0 2px 8px ${color}33` : 'none',
        }}
        onMouseEnter={e => { if (canPlay) (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
      >
        {playing && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: `${color}22`, animationDuration: '1.4s' }}
          />
        )}
        {playing ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
      </button>
    </div>
  );
}

type Chapter = (typeof chapters)[number];

function CompanionCard({
  chapter,
  index,
  flipped,
  hovered,
  onToggleFlip,
  onHover,
  isMobile,
}: {
  chapter: Chapter;
  index: number;
  flipped: boolean;
  hovered: boolean;
  onToggleFlip: () => void;
  onHover: (v: boolean) => void;
  isMobile: boolean;
}) {
  const char = chapter.character;
  const cardH = CARD_PAD + CARD_IMG_H + BOTTOM_H;
  const rotate = index % 2 === 0 ? -2 : 2;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      style={{
        width: `${CARD_W}px`,
        height: `${cardH}px`,
        perspective: '900px',
        transform: hovered && !flipped ? 'scale(1.04) rotate(0deg)' : `rotate(${rotate}deg)`,
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        justifySelf: 'center',
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: isMobile ? 'flat' : 'preserve-3d',
          transform: isMobile ? 'none' : flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          onClick={onToggleFlip}
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            background: '#fff', borderRadius: '4px',
            boxShadow: hovered ? '0 12px 36px rgba(0,0,0,0.35)' : '0 6px 24px rgba(0,0,0,0.22)',
            cursor: 'pointer', display: isMobile && flipped ? 'none' : 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
        >
          <div
            className="absolute top-2 left-2 z-10 font-mono rounded-sm px-1.5 py-0.5"
            style={{
              fontSize: '9px', letterSpacing: '0.06em',
              background: 'rgba(255,255,255,0.88)', color: chapter.color,
              border: `1px solid ${chapter.color}44`,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          <div
            className="relative flex items-center justify-center flex-shrink-0"
            style={{
              margin: `${CARD_PAD}px ${CARD_PAD}px 0`,
              height: `${CARD_IMG_H}px`,
              background: char.visualGradient,
              overflow: 'hidden',
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle at 60% 35%, ${chapter.color}22 0%, transparent 65%)` }}
            />
            <span
              className="relative select-none transition-opacity duration-300"
              style={{
                fontSize: `${CARD_SIZE * 0.28}px`,
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
                zIndex: 0,
                opacity: imageLoaded ? 0 : 1,
              }}
            >
              {char.emoji}
            </span>
            <img
              src={cardThumb(char.image)}
              alt={char.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              loading="eager"
              decoding="async"
              style={{ zIndex: 1, opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              onError={e => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.src.endsWith('.png')) {
                  img.src = char.image;
                  return;
                }
                img.style.display = 'none';
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
              style={{ background: 'rgba(0,0,0,0.16)', opacity: hovered ? 1 : 0, zIndex: 2 }}
            >
              <span className="font-mono text-white" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
                点击了解 TA
              </span>
            </div>
          </div>

          <div
            className="flex flex-col items-center px-2 pt-1 flex-1"
            style={{ justifyContent: 'center', gap: '6px', paddingBottom: '8px' }}
          >
            <div className="text-center">
              <p
                style={{
                  fontFamily: CARD_TEXT_FONT,
                  fontSize: '0.86rem',
                  color: '#111',
                  letterSpacing: '0.02em',
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                {char.name}
              </p>
              <p
                className="mt-0.5 line-clamp-2"
                style={{
                  fontFamily: CARD_TEXT_FONT,
                  fontSize: '0.58rem',
                  color: '#222',
                  letterSpacing: '0.02em',
                  lineHeight: 1.45,
                  fontWeight: 600,
                }}
              >
                {char.role}
              </p>
            </div>
            <VoiceButton src={char.audio} color={chapter.color} />
          </div>
        </div>

        <div
          onClick={onToggleFlip}
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: isMobile ? 'none' : 'rotateY(180deg)',
            background: '#fff', borderRadius: '4px',
            boxShadow: hovered ? '0 12px 36px rgba(0,0,0,0.35)' : '0 6px 24px rgba(0,0,0,0.22)',
            cursor: 'pointer', display: isMobile && !flipped ? 'none' : 'flex', flexDirection: 'column',
            padding: '10px', overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '2px', borderRadius: '2px', flexShrink: 0,
              background: `linear-gradient(90deg, ${chapter.color}, ${chapter.color}44)`,
              marginBottom: '8px',
            }}
          />
          <p
            className="flex-shrink-0"
            style={{
              fontFamily: CARD_TEXT_FONT,
              fontSize: '0.82rem',
              color: '#111',
              letterSpacing: '0.02em',
              marginBottom: '8px',
              fontWeight: 700,
              lineHeight: 1.35,
            }}
          >
            {char.name}
            <span
              className="ml-1.5"
              style={{
                fontFamily: CARD_TEXT_FONT,
                fontSize: '0.58rem',
                color: '#222',
                letterSpacing: '0.02em',
                fontWeight: 600,
              }}
            >
              {char.role}
            </span>
          </p>
          <p
            style={{
              flex: 1,
              fontFamily: CARD_TEXT_FONT,
              fontSize: '0.61rem',
              lineHeight: 1.72,
              color: '#222',
              letterSpacing: '0.015em',
              fontWeight: 600,
              overflowY: 'auto',
            }}
          >
            {char.intro}
          </p>
          <p
            className="text-center flex-shrink-0 mt-1.5"
            style={{
              fontFamily: CARD_TEXT_FONT,
              fontSize: '0.54rem',
              color: '#444',
              letterSpacing: '0.02em',
              fontWeight: 600,
            }}
          >
            ← 点击返回
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Companions() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [flipped, setFlipped] = useState<boolean[]>(() => chapters.map(() => false));
  const [hovered, setHovered] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const isMobile = useIsMobile();

  const pageStart = page * CARDS_PER_PAGE;
  const pageChapters = chapters.slice(pageStart, pageStart + CARDS_PER_PAGE);

  const goPage = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(totalPages - 1, next));
    setPage(clamped);
    setHovered(null);
  }, []);

  const toggleFlip = (globalIndex: number) =>
    setFlipped(prev => prev.map((v, idx) => (idx === globalIndex ? !v : v)));

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => setEntered(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !entered) return;

    gsap.fromTo(
      grid,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [page, entered]);

  return (
    <section ref={sectionRef} className="relative z-10 px-[5vw] py-20 lg:py-28">
      <div className="text-center mb-10">
        <h2
          className="font-display text-white"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '0.1em' }}
        >
          {siteConfig.companionsSectionTitle}
        </h2>
        <p
          className="font-mono text-white/40 mt-3"
          style={{ fontSize: '11px', letterSpacing: '0.12em' }}
        >
          共 {chapters.length} 段故事 · 点击卡片翻面
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            type="button"
            aria-label="上一页"
            disabled={page === 0}
            onClick={() => goPage(page - 1)}
            className="flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
            style={{
              width: '40px', height: '40px',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2 min-w-[120px] justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`第 ${i + 1} 页`}
                onClick={() => goPage(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === page ? '24px' : '8px',
                  height: '8px',
                  background: i === page ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)',
                }}
              />
            ))}
          </div>

          <span
            className="font-mono text-white/50 hidden sm:block"
            style={{ fontSize: '11px', letterSpacing: '0.08em', minWidth: '72px', textAlign: 'center' }}
          >
            {pageStart + 1}–{Math.min(pageStart + CARDS_PER_PAGE, chapters.length)} / {chapters.length}
          </span>

          <button
            type="button"
            aria-label="下一页"
            disabled={page >= totalPages - 1}
            onClick={() => goPage(page + 1)}
            className="flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
            style={{
              width: '40px', height: '40px',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div
          ref={gridRef}
          className="grid gap-x-3 gap-y-6 justify-items-center"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
            maxWidth: `${CARDS_PER_PAGE * (CARD_W + 12)}px`,
            margin: '0 auto',
          }}
        >
          {pageChapters.map((chapter, i) => {
            const globalIndex = pageStart + i;
            return (
              <CompanionCard
                key={chapter.id}
                chapter={chapter}
                index={globalIndex}
                flipped={flipped[globalIndex]}
                hovered={hovered === globalIndex}
                onToggleFlip={() => toggleFlip(globalIndex)}
                onHover={v => setHovered(v ? globalIndex : null)}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
