import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

// =========================================================================================================
// Slices
// =========================================================================================================

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
      // OK, because immer makes it immutable under the hood
      state.seconds += 0.1;
    },
    toggle: (state) => {
      state.isRunning = !state.isRunning;
    },
    setTimeRef: (state, action: PayloadAction<TimerSlice['timerRef']>) => {
      state.timerRef = action.payload;
    },
  },
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
  // Add reducers for additional action types here, and handle loading state as needed
  extraReducers: (builder) => {
    // Fetch Reducer, that is called when async thunk is fulfilled/resolved
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload.todos;
    });
  },
});

// =========================================================================================================
// Actions
// =========================================================================================================

// Can maybe made cleaner by combinging the
export const incrementSeconds = () => {
  const { timer, todos } = store.getState();

  // Increment Seconds
  store.dispatch(increment());

  // Fetch dummy Data
  if (timer.seconds > 2 && todos.todos == null) store.dispatch(fetchTodos());
};

export const toggleTimer = () => {
  const { timer } = store.getState();

  store.dispatch(toggle());

  // Clear Interval
  if (timer.timerRef != null) {
    clearInterval(timer.timerRef);
    store.dispatch(setTimeRef(null));
  }

  // Start Interval
  // Note: Not using 'timer.isRunning' as the destructed timer
  // has still the old 'isRunning' value before toggling it via 'toggle()'
  if (store.getState().timer.isRunning)
    store.dispatch(setTimeRef(setInterval(() => incrementSeconds(), 100)));
};

// https://redux-toolkit.js.org/api/createAsyncThunk
// https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk
const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const response = await fetch('/data.json');
  const parsedJson = await response.json();
  return parsedJson;
});

// =========================================================================================================
// Store
// =========================================================================================================

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

export const { increment, toggle, setTimeRef } = timerSlice.actions;

// =========================================================================================================
// OLD tries
// =========================================================================================================

// type TimerSlice = {
//   seconds: number;
//   isRunning: boolean;
//   timerRef: number | null;
// };
//
// const timerSlice = createSlice({
//   name: 'timer',
//   initialState: {
//     seconds: 0,
//     isRunning: false,
//     timerRef: null,
//   } as TimerSlice,
//   reducers: {
//     increment: (state) => {
//       state.seconds += 0.1;
//     },
//     toggle: (state) => {
//       state.isRunning = !state.isRunning;
//
//       // Clear Interval
//       if (state.timerRef != null) {
//         clearInterval(state.timerRef);
//         state.timerRef = null;
//       }
//
//       // Start Interval
//       if (state.isRunning)
//         state.timerRef = setInterval(() => incrementSeconds(), 100);
//     },
//   },
// });
//
// export const incrementSeconds = () => {
//   const { timer, todos } = store.getState();
//
//   // Increment Seconds
//   store.dispatch(increment());
//
//   // Fetch dummy Data
//   if (timer.seconds > 2 && todos.todos == null) store.dispatch(fetchTodos());
// };
//
// // https://redux-toolkit.js.org/api/createAsyncThunk
// const fetchTodos = createAsyncThunk('todos/fetch', async () => {
//   const response = await fetch('/data.json');
//   const parsedJson = await response.json();
//   return parsedJson;
// });
//
// type TodosSlice = {
//   todos: string[] | null;
// };
//
// const todosSlice = createSlice({
//   name: 'todos',
//   initialState: {
//     todos: null,
//   } as TodosSlice,
//   reducers: {},
//   // https://redux-toolkit.js.org/api/createAsyncThunk
//   extraReducers: (builder) => {
//     builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
//       state.todos = payload.todos;
//     });
//   },
// });
//
// export const store = configureStore({
//   reducer: {
//     timer: timerSlice.reducer,
//     todos: todosSlice.reducer,
//   },
// });
//
// type RootState = ReturnType<typeof store.getState>;
//
// export const selectSeconds = (state: RootState) => state.timer.seconds;
// export const selectIsRunning = (state: RootState) => state.timer.isRunning;
// export const selectTodos = (state: RootState) => state.todos.todos;
//
// export const { increment, toggle: toggleTimer } = timerSlice.actions;
