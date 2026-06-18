import { useContext } from 'react';
import { AmbientMusicContext } from '@/context/ambientMusicContextValue';

export function useAmbientMusic() {
  const ctx = useContext(AmbientMusicContext);
  if (!ctx) throw new Error('useAmbientMusic must be used within AmbientMusicProvider');
  return ctx;
}
