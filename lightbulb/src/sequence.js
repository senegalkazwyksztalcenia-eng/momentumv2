/** off → flicker → lit */
export const FLICKER_START_MS = 800;
export const LIT_START_MS = 2200;

/**
 * @param {(state: { phase: string; contentVisible: boolean }) => void} onChange
 * @returns {() => void} cleanup
 */
export function startBulbSequence(onChange) {
  const timers = [];
  let phase = "off";
  let contentVisible = false;

  const emit = () => onChange({ phase, contentVisible });

  const schedule = (fn, at) => {
    timers.push(window.setTimeout(fn, at));
  };

  emit();
  schedule(() => {
    phase = "flicker";
    emit();
  }, FLICKER_START_MS);
  schedule(() => {
    phase = "lit";
    contentVisible = true;
    emit();
  }, LIT_START_MS);

  return () => timers.forEach(window.clearTimeout);
}
