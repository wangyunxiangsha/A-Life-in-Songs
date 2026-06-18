import { createContext } from 'react';
import type { Chapter } from '@/content/config';

export interface AppState {
  currentChapter: Chapter;
  sliderValue: number;
  videoSrc: string;
  setChapter: (id: string) => void;
  setSliderValue: (value: number) => void;
  setVideoSrc: (src: string) => void;
}

export const AppContext = createContext<AppState | null>(null);
