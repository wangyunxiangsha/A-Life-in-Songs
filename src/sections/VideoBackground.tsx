import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { getTimeFilter } from '@/types';
import { siteConfig } from '@/content/config';

function chapterPoster(fullPng: string | undefined): string {
  const match = fullPng?.match(/\/images\/ch(\d{2})\.png$/);
  return match ? `/images/ch${match[1]}.png` : '/images/intro-poster.jpg';
}

export default function VideoBackground() {
  const { currentChapter, videoSrc, sliderValue } = useApp();
  const [videoReady, setVideoReady] = useState(false);

  const posterSrc = useMemo(() => (
    videoSrc === siteConfig.introVideo
      ? '/images/intro-poster.jpg'
      : chapterPoster(currentChapter.character?.image)
  ), [currentChapter.character?.image, videoSrc]);

  const filterStyle = useMemo(() => {
    const filter = getTimeFilter(sliderValue);
    return `brightness(${filter.brightness}) sepia(${filter.sepia}) saturate(${filter.saturate}) hue-rotate(${filter.hueRotate}deg)`;
  }, [sliderValue]);

  useEffect(() => {
    setVideoReady(false);
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={posterSrc}
        alt=""
        aria-hidden="true"
        decoding="async"
        style={{ filter: filterStyle }}
      />
      {videoSrc && (
        <video
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          onLoadedData={() => setVideoReady(true)}
          style={{ filter: filterStyle, opacity: videoReady ? 1 : 0 }}
        />
      )}
    </div>
  );
}
