import { proxy } from 'valtio';

interface ApplicationState {
  seconds: number;
  isRunning: boolean;
  todos?: string[];
}

export const store = proxy<ApplicationState>({
  seconds: 0,
  isRunning: false,
  todos: undefined,
});

export const incrementSeconds = async (amount = 0.1) => {
  // Increment Seconds
  store.seconds += amount;

  // Fetch dummy Data
  if (store.seconds > 2 && store.todos == null) {
    const response = await fetch('/data.json');
    const parsedJson = await response.json();
    store.todos = parsedJson.todos;
  }
};

export const { toggleTimer } = (() => {
  let timerRef: null | number = null;

  const toggleTimer = () => {
    store.isRunning = !store.isRunning;

    // Clear Interval
    if (timerRef != null) {
      clearInterval(timerRef);
      timerRef = null;
    }

    if (store.isRunning) timerRef = setInterval(incrementSeconds, 100);
  };
  return { toggleTimer };
})();
