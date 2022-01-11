import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

type TimerSlice = {
  seconds: number;
  isRunning: boolean;
  timerRef: number | null;
};

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    seconds: 0,
    isRunning: false,
    timerRef: null,
  } as TimerSlice,
  reducers: {
    increment: (state) => {
      state.seconds += 0.1;
    },
    toggle: (state) => {
      state.isRunning = !state.isRunning;

      // Clear Interval
      if (state.timerRef != null) {
        clearInterval(state.timerRef);
        state.timerRef = null;
      }

      // Start Interval
      if (state.isRunning)
        state.timerRef = setInterval(() => incrementSeconds(), 100);
    },
  },
});

export const incrementSeconds = () => {
  const { timer, todos } = store.getState();

  // Increment Seconds
  store.dispatch(increment());

  // Fetch dummy Data
  if (timer.seconds > 2 && todos.todos == null) store.dispatch(fetchTodos());
};

// https://redux-toolkit.js.org/api/createAsyncThunk
const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const response = await fetch('/data.json');
  const parsedJson = await response.json();
  return parsedJson;
});

type TodosSlice = {
  todos: string[] | null;
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: null,
  } as TodosSlice,
  reducers: {},
  // https://redux-toolkit.js.org/api/createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      state.todos = payload.todos;
    });
  },
});

export const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
    todos: todosSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectSeconds = (state: RootState) => state.timer.seconds;
export const selectIsRunning = (state: RootState) => state.timer.isRunning;
export const selectTodos = (state: RootState) => state.todos.todos;

export const { increment, toggle: toggleTimer } = timerSlice.actions;
