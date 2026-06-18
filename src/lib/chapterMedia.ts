const INTRO_POSTER = '/images/intro-poster.jpg';
const CHAPTER_IMAGE_PATTERN = /\/images\/ch(\d{2})\.png$/;

export function chapterImageThumb(fullPng: string): string {
  const match = fullPng.match(CHAPTER_IMAGE_PATTERN);
  return match ? `/images/thumbs/ch${match[1]}.webp` : fullPng;
}

export function chapterPosterFromImage(fullPng: string | undefined): string {
  return fullPng ? chapterImageThumb(fullPng) : INTRO_POSTER;
}

export function parseChapterHeading(title: string): { era: string | null; song: string } {
  const parts = title.split(' · ').filter(Boolean);
  const displayParts = parts[0]?.includes('章') ? parts.slice(1) : parts;

  if (displayParts.length >= 2) {
    return { era: displayParts[0], song: displayParts.slice(1).join(' · ') };
  }

  return { era: null, song: displayParts.join(' · ') };
}
