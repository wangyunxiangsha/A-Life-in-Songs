import { chapters } from '@/content/config';
import { useApp } from '@/context/useApp';
import { parseChapterHeading } from '@/lib/chapterMedia';
import { getChapterProgress, scrollToChapter } from '@/lib/chapterProgress';

export default function ChapterProgressNav() {
  const { currentChapter } = useApp();
  const progress = getChapterProgress(chapters, currentChapter.id);
  const activeHeading = parseChapterHeading(currentChapter.title);

  return (
    <>
      <nav className="chapter-progress-nav" aria-label="章节导航">
        <div className="chapter-progress-rail" aria-hidden="true">
          <span style={{ height: `${progress.percent}%` }} />
        </div>
        <div className="chapter-progress-dots">
          {chapters.map((chapter, index) => {
            const heading = parseChapterHeading(chapter.title);
            const isActive = chapter.id === currentChapter.id;

            return (
              <button
                key={chapter.id}
                type="button"
                className="chapter-progress-dot"
                aria-label={`跳转到第 ${index + 1} 章：${heading.song}`}
                aria-current={isActive ? 'step' : undefined}
                title={`${index + 1}. ${heading.song}`}
                style={{ ['--chapter-color' as string]: chapter.color }}
                onClick={() => scrollToChapter(chapter.id)}
              >
                <span className="chapter-progress-dot-core" />
                <span className="chapter-progress-tooltip">
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  {heading.song}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="chapter-progress-mobile" aria-live="polite">
        <div className="chapter-progress-mobile-meta">
          <span>{progress.label}</span>
          <strong>{activeHeading.song}</strong>
        </div>
        <div className="chapter-progress-mobile-track" aria-hidden="true">
          <span style={{ width: `${progress.percent}%`, backgroundColor: currentChapter.color }} />
        </div>
      </div>
    </>
  );
}
