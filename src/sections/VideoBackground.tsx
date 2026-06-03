import { useRef, useEffect, useState, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { getTimeFilter } from '@/types';
import gsap from 'gsap';

export default function VideoBackground() {
  const { videoSrc, sliderValue } = useApp();
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState(1);
  const isTransitioning = useRef(false);
  const prevSrcRef = useRef(videoSrc);

  // Apply time filter to active video
  useEffect(() => {
    const filter = getTimeFilter(sliderValue);
    const videoEl = activeVideo === 1 ? videoRef1.current : videoRef2.current;
    if (videoEl) {
      videoEl.style.filter = `brightness(${filter.brightness}) sepia(${filter.sepia}) saturate(${filter.saturate}) hue-rotate(${filter.hueRotate}deg)`;
    }
  }, [sliderValue, activeVideo]);

  // Crossfade when videoSrc changes
  const switchVideo = useCallback(() => {
    if (isTransitioning.current) return;
    if (prevSrcRef.current === videoSrc) return;

    isTransitioning.current = true;
    const fromVideo = activeVideo === 1 ? videoRef1.current : videoRef2.current;
    const toVideo   = activeVideo === 1 ? videoRef2.current : videoRef1.current;

    if (!fromVideo || !toVideo) {
      isTransitioning.current = false;
      return;
    }

    toVideo.src = videoSrc;
    toVideo.load();
    toVideo.play().catch(() => {});

    const filter = getTimeFilter(sliderValue);
    toVideo.style.filter = `brightness(${filter.brightness}) sepia(${filter.sepia}) saturate(${filter.saturate}) hue-rotate(${filter.hueRotate}deg)`;

    gsap.to(fromVideo, { opacity: 0, duration: 0.8, ease: 'power2.out' });
    gsap.fromTo(toVideo, { opacity: 0 }, {
      opacity: 1, duration: 0.8, ease: 'power2.in',
      onComplete: () => {
        isTransitioning.current = false;
        prevSrcRef.current = videoSrc;
        setActiveVideo(activeVideo === 1 ? 2 : 1);
      },
    });
  }, [videoSrc, sliderValue, activeVideo]);

  useEffect(() => {
    switchVideo();
  }, [switchVideo]);

  // Initial load — start with intro video
  useEffect(() => {
    const v1 = videoRef1.current;
    if (v1) {
      v1.src = videoSrc;
      v1.load();
      v1.play().catch(() => {});
      const filter = getTimeFilter(sliderValue);
      v1.style.filter = `brightness(${filter.brightness}) sepia(${filter.sepia}) saturate(${filter.saturate}) hue-rotate(${filter.hueRotate}deg)`;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef1}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        loop
        preload="auto"
        style={{ opacity: activeVideo === 1 ? 1 : 0 }}
      />
      <video
        ref={videoRef2}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        loop
        preload="auto"
        style={{ opacity: activeVideo === 2 ? 1 : 0 }}
      />
    </div>
  );
}
