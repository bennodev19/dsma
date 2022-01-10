import { atom } from 'jotai';

export const todosAtom = atom<string[] | null>(null);
export const secondsAtom = atom(0);
const incrementSecondsAtom = atom(
  (get) => get(secondsAtom),
  async (get, set, amount: number) => {
    // Increment Seconds
    set(secondsAtom, get(secondsAtom) + amount);

    // Fetch dummy Data
    if (get(secondsAtom) > 2 && !get(todosAtom)) {
      const response = await fetch('/data.json');
      const parsedJson = await response.json();
      set(todosAtom, parsedJson.todos);
    }
  }
);

const timerRefAtom = atom<number | null>(null);
export const runningAtom = atom(
  (get) => get(timerRefAtom) != null,
  (get, set, start: boolean) => {
    // Clear Interval
    if (get(timerRefAtom) != null) {
      clearInterval(get(timerRefAtom) || undefined);
      set(timerRefAtom, null);
    }

    // Start Interval
    if (start) {
      set(
        timerRefAtom,
        setInterval(() => {
          set(incrementSecondsAtom, 0.1);
        }, 100)
      );
    }

    return get(timerRefAtom) != null;
  }
);
