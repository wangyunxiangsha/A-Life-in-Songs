import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { siteConfig } from '@/content/config';
import { getActiveKey, playExclusive, stopExclusive, subscribe } from '@/lib/audioManager';

const AMBIENT_KEY = 'ambient';
const PREF_KEY = 'ambient-music-enabled';

export type AmbientLoadStatus = 'loading' | 'ready' | 'error';

function readWantsEnabled(): boolean {
  try {
    return localStorage.getItem(PREF_KEY) !== '0';
  } catch {
    return true;
  }
}

function resolveAudioSrc(path: string) {
  return encodeURI(path);
}

interface AmbientMusicState {
  enabled: boolean;
  playing: boolean;
  status: AmbientLoadStatus;
  available: boolean;
  toggle: () => void;
  labelOn: string;
  labelOff: string;
}

const AmbientMusicContext = createContext<AmbientMusicState | null>(null);

export function AmbientMusicProvider({ children }: { children: React.ReactNode }) {
  const { ambientMusic } = siteConfig;
  const audioRef = useRef<HTMLAudioElement>(null);
  const wantsEnabledRef = useRef(readWantsEnabled());
  const [enabled, setEnabled] = useState(wantsEnabledRef.current);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState<AmbientLoadStatus>('loading');

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.volume = ambientMusic.volume;
  }, [ambientMusic.volume]);

  const stopAmbient = useCallback(() => {
    const a = audioRef.current;
    if (a) a.pause();
    setPlaying(false);
    stopExclusive(AMBIENT_KEY);
  }, []);

  const startAmbient = useCallback(() => {
    const a = audioRef.current;
    if (!a || status !== 'ready') return;

    playExclusive(AMBIENT_KEY, stopAmbient);
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        stopExclusive(AMBIENT_KEY);
        setPlaying(false);
      });
  }, [status, stopAmbient]);

  const toggle = useCallback(() => {
    const next = !enabled;
    wantsEnabledRef.current = next;
    setEnabled(next);
    try {
      localStorage.setItem(PREF_KEY, next ? '1' : '0');
    } catch {
      /* ignore */
    }
    if (next) startAmbient();
    else stopAmbient();
  }, [enabled, startAmbient, stopAmbient]);

  useEffect(() => {
    return subscribe(() => {
      const key = getActiveKey();
      const a = audioRef.current;
      if (!a || !enabled) return;

      if (key && key !== AMBIENT_KEY) {
        a.pause();
        setPlaying(false);
      } else if (!key && wantsEnabledRef.current && status === 'ready') {
        startAmbient();
      }
    });
  }, [enabled, status, startAmbient]);

  useEffect(() => {
    if (!enabled || status !== 'ready') return;

    const tryStart = () => startAmbient();
    window.addEventListener('pointerdown', tryStart, { once: true, passive: true });
    tryStart();

    return () => {
      window.removeEventListener('pointerdown', tryStart);
    };
  }, [enabled, status, startAmbient]);

  useEffect(() => () => stopAmbient(), [stopAmbient]);

  const value: AmbientMusicState = {
    enabled,
    playing,
    status,
    available: status === 'ready',
    toggle,
    labelOn: ambientMusic.labelOn,
    labelOff: ambientMusic.labelOff,
  };

  return (
    <AmbientMusicContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={resolveAudioSrc(ambientMusic.src)}
        loop
        preload="metadata"
        onCanPlay={() => setStatus('ready')}
        onError={() => setStatus('error')}
      />
    </AmbientMusicContext.Provider>
  );
}

export function useAmbientMusic() {
  const ctx = useContext(AmbientMusicContext);
  if (!ctx) throw new Error('useAmbientMusic must be used within AmbientMusicProvider');
  return ctx;
}
