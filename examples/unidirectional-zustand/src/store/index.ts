import create from 'zustand';

interface ApplicationState {
  seconds: number;
  isRunning: boolean;
  todos?: string[];
  intervalRef: number | null;
  toggleTimer: () => void;
  incrementSeconds: () => void;
}

export const useApplicationState = create<ApplicationState>((set, get) => ({
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
    if (get().seconds > 2.0 && !get().todos) {
      const response = await fetch('/data.json');
      const parsedJson = await response.json();
      set({ todos: parsedJson });
    }
  },
}));
