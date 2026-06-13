import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { getTimeFilter } from '@/types';
import introPosterUrl from '@/assets/intro-poster.jpg';

export default function VideoBackground() {
  const { videoSrc, sliderValue } = useApp();

  const filterStyle = useMemo(() => {
    const filter = getTimeFilter(sliderValue);
    return `brightness(${filter.brightness}) sepia(${filter.sepia}) saturate(${filter.saturate}) hue-rotate(${filter.hueRotate}deg)`;
  }, [sliderValue]);

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={introPosterUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ filter: filterStyle }}
      />
    </div>
  );
}
