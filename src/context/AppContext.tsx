import React, { useState, useCallback, useMemo } from 'react';
import { chapters, siteConfig } from '@/content/config';
import type { Chapter } from '@/content/config';
import { AppContext } from '@/context/appContextValue';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentChapter, setCurrentChapterState] = useState<Chapter>(chapters[0]);
  const [sliderValue, setSliderValueState] = useState(0.15);
  const [videoSrc, setVideoSrcState] = useState(siteConfig.introVideo);
  const chaptersById = useMemo(
    () => new Map(chapters.map((chapter) => [chapter.id, chapter])),
    [],
  );

  const setChapter = useCallback((id: string) => {
    const chapter = chaptersById.get(id);
    if (chapter) {
      setCurrentChapterState((prev) => prev.id === id ? prev : chapter);
    }
  }, [chaptersById]);

  const setSliderValue = useCallback((value: number) => {
    setSliderValueState(Math.max(0, Math.min(1, value)));
  }, []);

  const setVideoSrc = useCallback((src: string) => {
    setVideoSrcState((prev) => (prev === src ? prev : src));
  }, []);

  const value = useMemo(() => ({
    currentChapter,
    sliderValue,
    videoSrc,
    setChapter,
    setSliderValue,
    setVideoSrc,
  }), [currentChapter, sliderValue, videoSrc, setChapter, setSliderValue, setVideoSrc]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

