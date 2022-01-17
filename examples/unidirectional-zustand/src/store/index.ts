import create from 'zustand';

interface TimerState {
  seconds: number;
  isRunning: boolean;
  intervalRef: number | null;
  toggleTimer: () => void;
  incrementSeconds: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  seconds: 0,
  isRunning: false,
  todos: undefined,
  intervalRef: null,
  toggleTimer: () => {
    set((state) => ({
      isRunning: !state.isRunning,
    }));

    // Clear Interval
    if (get().intervalRef != null) {
      clearInterval(get().intervalRef!);
      set({ intervalRef: null });
    }

    // Start Interval
    if (get().isRunning)
      set({ intervalRef: setInterval(get().incrementSeconds, 100) });
  },
  incrementSeconds: async () => {
    // Increment Seconds
    set((state) => ({
      seconds: state.seconds + 0.1,
    }));

    // Fetch dummy Data
    if (get().seconds > 2.0 && !useTodosStore.getState().todos) {
      const response = await fetch('/data.json');
      const parsedJson = await response.json();
      useTodosStore.setState({ todos: parsedJson });
    }
  },
}));

interface TodosState {
  todos?: string[];
  setTodos: (todos: string[] | undefined) => void;
}

export const useTodosStore = create<TodosState>((set, get) => ({
  todos: undefined,
  setTodos: (todos) => {
    set({ todos: todos });
  },
}));
