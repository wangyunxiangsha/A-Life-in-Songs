import type { Chapter } from '@/content/config';

export function getChapterProgress(chapters: readonly Chapter[], currentChapterId: string) {
  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === currentChapterId));
  const total = chapters.length;
  const percent = total <= 1 ? 100 : (activeIndex / (total - 1)) * 100;

  return {
    activeIndex,
    total,
    percent,
    label: `${activeIndex + 1}/${total}`,
  };
}

export function scrollToChapter(chapterId: string) {
  const target = document.getElementById(`chapter-${chapterId}`);
  if (!target) return;

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}
