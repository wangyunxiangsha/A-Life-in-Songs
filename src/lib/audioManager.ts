type ActiveAudio = {
  key: string;
  stop: () => void;
};

let active: ActiveAudio | null = null;
const listeners = new Set<(playing: boolean) => void>();

function notify() {
  const playing = active !== null;
  listeners.forEach((fn) => fn(playing));
}

/** 播放前调用：停止其他音频，仅保留当前这一条 */
export function playExclusive(key: string, stop: () => void) {
  if (active?.key === key) return;
  if (active) {
    const prev = active;
    active = null;
    prev.stop();
  }
  active = { key, stop };
  notify();
}

/** 当前音频停止或结束时调用 */
export function stopExclusive(key: string) {
  if (active?.key === key) {
    active = null;
    notify();
  }
}

export function getActiveKey(): string | null {
  return active?.key ?? null;
}

export function stopCurrentAudio() {
  if (!active) return;
  active.stop();
}

export function subscribe(onPlayingChange: (playing: boolean) => void) {
  listeners.add(onPlayingChange);
  onPlayingChange(active !== null);
  return () => {
    listeners.delete(onPlayingChange);
  };
}
