import { createState } from '@agile-ts/core';

export const TODOS = createState<string[] | null>(null);
export const SECONDS = createState(0);
export const IS_RUNNING = createState(false);

export const incrementSeconds = async (amount = 0.1) => {
  const seconds = SECONDS.value;
  const todos = TODOS.value;

  // Increment Seconds
  SECONDS.set((v) => v + amount);

  // Fetch dummy Data
  if (seconds > 2 && todos == null) {
    const response = await fetch('/data.json');
    const parsedJson = await response.json();
    TODOS.set(parsedJson.todos);
  }
};

export const { toggleTimer } = (() => {
  let timerRef: null | number = null;

  const toggleTimer = () => {
    const nextIsRunning = !IS_RUNNING.value;
    IS_RUNNING.set(nextIsRunning);

    // Clear Interval
    if (timerRef != null) {
      clearInterval(timerRef);
      timerRef = null;
    }

    // Start Interval
    if (nextIsRunning) timerRef = setInterval(incrementSeconds, 100);
  };

  return { toggleTimer };
})();
