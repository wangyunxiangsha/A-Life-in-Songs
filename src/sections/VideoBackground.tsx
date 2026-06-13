import { useRef, useEffect, useState, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { getTimeFilter } from '@/types';

export default function VideoBackground() {
  const { videoSrc, sliderValue } = useApp();
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState(1);
  const [videoVisible, setVideoVisible] = useState(true);
  const isTransitioning = useRef(false);
  const prevSrcRef = useRef(videoSrc);

  const applyFilter = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return;
    const filter = getTimeFilter(sliderValue);
    el.style.filter = `brightness(${filter.brightness}) sepia(${filter.sepia}) saturate(${filter.saturate}) hue-rotate(${filter.hueRotate}deg)`;
  }, [sliderValue]);

  useEffect(() => {
    const videoEl = activeVideo === 1 ? videoRef1.current : videoRef2.current;
    applyFilter(videoEl);
  }, [sliderValue, activeVideo, applyFilter]);

  const fadeToBlack = useCallback(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1 || !v2) return;

    isTransitioning.current = true;
    v1.pause();
    v2.pause();

    const onDone = () => {
      isTransitioning.current = false;
      prevSrcRef.current = '';
      setVideoVisible(false);
    };

    if (videoVisible) {
      const active = activeVideo === 1 ? v1 : v2;
      const inactive = activeVideo === 1 ? v2 : v1;
      inactive.style.opacity = '0';
      active.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, easing: 'ease-out', fill: 'forwards' })
        .finished.then(onDone)
        .catch(onDone);
    } else {
      onDone();
    }
  }, [activeVideo, videoVisible]);

  const switchVideo = useCallback(() => {
    if (isTransitioning.current) return;
    if (prevSrcRef.current === videoSrc) return;

    if (!videoSrc) {
      fadeToBlack();
      return;
    }

    isTransitioning.current = true;
    const fromVideo = activeVideo === 1 ? videoRef1.current : videoRef2.current;
    const toVideo = activeVideo === 1 ? videoRef2.current : videoRef1.current;

    if (!fromVideo || !toVideo) {
      isTransitioning.current = false;
      return;
    }

    toVideo.src = videoSrc;
    toVideo.load();
    applyFilter(toVideo);
    toVideo.play().catch(() => {});

    setVideoVisible(true);

    const fromOpacity = videoVisible ? 1 : 0;
    fromVideo.style.opacity = String(fromOpacity);
    toVideo.style.opacity = '0';

    const fadeOut = videoVisible
      ? fromVideo.animate([{ opacity: fromOpacity }, { opacity: 0 }], { duration: 600, easing: 'ease-out', fill: 'forwards' }).finished
      : Promise.resolve();

    fadeOut
      .then(() => toVideo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: 'ease-in', fill: 'forwards' }).finished)
      .then(() => {
        isTransitioning.current = false;
        prevSrcRef.current = videoSrc;
        setActiveVideo(activeVideo === 1 ? 2 : 1);
      })
      .catch(() => {
        isTransitioning.current = false;
        prevSrcRef.current = videoSrc;
        setActiveVideo(activeVideo === 1 ? 2 : 1);
        setVideoVisible(true);
      });
  }, [videoSrc, activeVideo, videoVisible, applyFilter, fadeToBlack]);

  useEffect(() => {
    switchVideo();
  }, [switchVideo]);

  useEffect(() => {
    const v1 = videoRef1.current;
    if (!v1 || !videoSrc) return;
    v1.src = videoSrc;
    v1.load();
    applyFilter(v1);
    v1.play().catch(() => {});
    prevSrcRef.current = videoSrc;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <video
        ref={videoRef1}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        loop
        preload="auto"
        style={{ opacity: videoVisible && activeVideo === 1 ? 1 : 0 }}
      />
      <video
        ref={videoRef2}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        loop
        preload="auto"
        style={{ opacity: videoVisible && activeVideo === 2 ? 1 : 0 }}
      />
    </div>
  );
}
