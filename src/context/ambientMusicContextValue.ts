import { createContext } from 'react';

export type AmbientLoadStatus = 'loading' | 'ready' | 'error';

export interface AmbientMusicState {
  enabled: boolean;
  playing: boolean;
  status: AmbientLoadStatus;
  available: boolean;
  toggle: () => void;
  labelOn: string;
  labelOff: string;
}

export const AmbientMusicContext = createContext<AmbientMusicState | null>(null);
