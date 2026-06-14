import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { getTimeFilter } from '@/types';

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
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ filter: filterStyle }}
      />
    </div>
  );
}
