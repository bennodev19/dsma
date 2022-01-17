import { proxy } from 'valtio';

type TodosStore = {
  todos?: string[];
};

type TimerStore = {
  seconds: number;
  isRunning: boolean;
};

export const timerStore = proxy<TimerStore>({
  seconds: 0,
  isRunning: false,
});

export const todosStore = proxy<TodosStore>({
  todos: undefined,
});

export const incrementSeconds = async (amount = 0.1) => {
  // Increment Seconds
  timerStore.seconds += amount;

  // Fetch dummy Data
  if (timerStore.seconds > 2 && todosStore.todos == null) {
    const response = await fetch('/data.json');
    const parsedJson = await response.json();
    todosStore.todos = parsedJson.todos;
  }
};

export const { toggleTimer } = (() => {
  let timerRef: null | number = null;

  const toggleTimer = () => {
    timerStore.isRunning = !timerStore.isRunning;

    // Clear Interval
    if (timerRef != null) {
      clearInterval(timerRef);
      timerRef = null;
    }

    if (timerStore.isRunning) timerRef = setInterval(incrementSeconds, 100);
  };
  return { toggleTimer };
})();
