import { Volume2, VolumeX } from 'lucide-react';
import { useAmbientMusic } from '@/context/useAmbientMusic';

export default function AmbientMusicToggle() {
  const { enabled, available, status, toggle, labelOn, labelOff } = useAmbientMusic();

  const label =
    status === 'error'
      ? '音乐加载失败'
      : !available
        ? '音乐加载中'
        : enabled
          ? labelOn
          : labelOff;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={status === 'error'}
      className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200"
      style={{
        background: enabled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.18)',
        color: status === 'error' ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.85)',
        cursor: status === 'error' ? 'default' : 'pointer',
        fontSize: '0.68rem',
        letterSpacing: '0.08em',
      }}
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span className="font-mono hidden sm:inline">{label}</span>
    </button>
  );
}
