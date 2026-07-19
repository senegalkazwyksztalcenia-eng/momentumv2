/** off → strike → lit → (pause) → strike → lit — exactly twice. */
export const STRIKE_START_MS = 2000;
export const STRIKE_DURATION_MS = 1200;
export const LIT_START_MS = STRIKE_START_MS + STRIKE_DURATION_MS;
export const SECOND_STRIKE_START_MS = LIT_START_MS + 3000;
export const SECOND_LIT_START_MS = SECOND_STRIKE_START_MS + STRIKE_DURATION_MS;

/**
 * @param {(state: { phase: string; strikeKey: number; contentVisible: boolean }) => void} onChange
 * @returns {() => void} cleanup
 */
export function startBulbSequence(onChange) {
  const timers = [];
  let phase = "off";
  let strikeKey = 0;
  let contentVisible = false;

  const emit = () => onChange({ phase, strikeKey, contentVisible });

  const schedule = (fn, at) => {
    timers.push(window.setTimeout(fn, at));
  };

  const beginStrike = () => {
    phase = "strike";
    strikeKey += 1;
    emit();
  };

  const endStrike = () => {
    phase = "lit";
    contentVisible = true;
    emit();
  };

  emit();
  schedule(beginStrike, STRIKE_START_MS);
  schedule(endStrike, LIT_START_MS);
  schedule(beginStrike, SECOND_STRIKE_START_MS);
  schedule(endStrike, SECOND_LIT_START_MS);

  return () => timers.forEach(window.clearTimeout);
}
