import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { getActiveKey, playExclusive, stopExclusive, subscribe } from '@/lib/audioManager';
import { useInViewLoad } from '@/hooks/useInViewLoad';

interface AudioPlayerProps {
  src: string;
  color: string;
  large?: boolean;
  label?: string;
}

export default function AudioPlayer({ src, color, large = false, label }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { ref: containerRef, active, activate } = useInViewLoad<HTMLDivElement>();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const shouldLoad = Boolean(src) && active;
  const audioSrc = useMemo(() => (src ? encodeURI(src) : ''), [src]);
  const audioKey = useMemo(() => `chapter:${src}`, [src]);

  const markCanPlay = useCallback(() => {
    setCanPlay(true);
    setLoadError(false);
  }, []);

  useEffect(() => {
    setCanPlay(false);
    setLoadError(false);
    setPlaying(false);
    setProgress(0);
    setDuration(0);
  }, [src, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    audioRef.current?.load();
  }, [shouldLoad, audioSrc]);

  const handleStop = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    stopExclusive(audioKey);
  }, [audioKey]);

  useEffect(() => {
    return subscribe(() => {
      if (getActiveKey() !== audioKey) {
        audioRef.current?.pause();
        setPlaying(false);
      }
    });
  }, [audioKey]);

  const toggle = () => {
    if (!src) return;
    if (!active) {
      activate();
      return;
    }
    const audio = audioRef.current;
    if (!audio || !canPlay) return;
    if (playing) {
      handleStop();
    } else {
      playExclusive(audioKey, handleStop);
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {
          stopExclusive(audioKey);
          setPlaying(false);
        });
    }
  };

  const formatTime = (s: number) => {
    if (!isFinite(s) || isNaN(s)) return '—';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !canPlay || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const statusText = !src
    ? '录音即将上线 · Coming Soon'
    : loadError
      ? '音频加载失败'
      : !canPlay
        ? shouldLoad
          ? '音频加载中…'
          : '靠近本章后自动加载'
        : label ?? (playing ? '暂停' : '聆听故事');

  const audioEvents = {
    onCanPlay: markCanPlay,
    onLoadedMetadata: () => {
      markCanPlay();
      if (audioRef.current) setDuration(audioRef.current.duration);
    },
    onTimeUpdate: () => {
      const a = audioRef.current;
      if (a && a.duration) setProgress(a.currentTime / a.duration);
    },
    onEnded: () => {
      handleStop();
      setProgress(0);
    },
    onError: () => setLoadError(true),
  };

  if (large) {
    return (
      <div ref={containerRef} className="flex flex-col items-center gap-4 mt-4 pt-4 border-t border-white/10">
        {shouldLoad && (
          <audio
            ref={audioRef}
            src={audioSrc}
            preload="auto"
            {...audioEvents}
          />
        )}

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={toggle}
            disabled={!src || loadError}
            className="relative flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              width: '64px',
              height: '64px',
              background: canPlay
                ? `radial-gradient(circle, ${color}55 0%, ${color}22 60%, transparent 100%)`
                : 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${canPlay ? color + 'aa' : 'rgba(255,255,255,0.15)'}`,
              color: canPlay ? '#ffffff' : 'rgba(255,255,255,0.25)',
              cursor: src && !loadError ? 'pointer' : 'default',
              boxShadow: canPlay && playing
                ? `0 0 24px ${color}66, 0 0 48px ${color}33`
                : canPlay
                  ? `0 0 12px ${color}33`
                  : 'none',
              transform: 'scale(1)',
            }}
            onMouseEnter={e => { if (canPlay) (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            {playing && (
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: `${color}22`, animationDuration: '1.8s' }}
              />
            )}
            {playing
              ? <Pause size={22} />
              : <Play size={22} style={{ marginLeft: '3px' }} />
            }
          </button>
        </div>

        <p className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>
          {statusText}
        </p>

        {canPlay && (
          <div className="w-full flex items-center gap-3">
            <span className="font-mono flex-shrink-0" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>
              {formatTime(progress * duration)}
            </span>
            <div
              className="flex-1 relative h-[2px] rounded-full overflow-hidden cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.1)' }}
              onClick={handleTrackClick}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ width: `${progress * 100}%`, background: color, transition: 'width 0.1s linear' }}
              />
            </div>
            <span className="font-mono flex-shrink-0" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>
              {formatTime(duration)}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="season-audio-player flex items-center gap-3 mt-7 p-4 rounded-xl"
      style={{ background: 'rgba(0,0,0,0.26)', border: '1px solid rgba(255,255,255,0.22)' }}
    >
      {shouldLoad && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="auto"
          {...audioEvents}
        />
      )}

      <button
        onClick={toggle}
        disabled={!src || loadError}
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: canPlay ? `${color}30` : 'rgba(255,255,255,0.06)',
          border: `1px solid ${canPlay ? color + '55' : 'rgba(255,255,255,0.12)'}`,
          color: canPlay ? '#ffffff' : 'rgba(255,255,255,0.3)',
          cursor: src && !loadError ? 'pointer' : 'default',
        }}
      >
        {playing
          ? <Pause size={13} />
          : <Play size={13} style={{ marginLeft: '2px' }} />
        }
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <Volume2 size={12} style={{ color: canPlay ? color : 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
          <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.76)', letterSpacing: '0.06em' }}>
            {statusText}
          </span>
          {canPlay && duration > 0 && (
            <span className="font-mono ml-auto flex-shrink-0" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.62)' }}>
              {formatTime(progress * duration)} / {formatTime(duration)}
            </span>
          )}
        </div>

        <div
          className="relative h-[2px] rounded-full overflow-hidden cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.24)' }}
          onClick={handleTrackClick}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${progress * 100}%`,
              background: canPlay ? color : 'rgba(255,255,255,0.15)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>
    </div>
  );
}
