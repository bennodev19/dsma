import { combineReducers, createStore, Dispatch } from 'redux';

// =========================================================================================================
// Timer Reducer and Actions
// =========================================================================================================

type TimerState = {
  seconds: number;
  isRunning: boolean;
  timerRef: number | null;
};

const INCREMENT_SECONDS = 'increment_seconds';
const TOGGLE_TIMER = 'toggle_timer';
const SET_TIMER_REF = 'set_timer_ref';

type TimerStateAction =
  | {
      type: typeof INCREMENT_SECONDS;
      payload: {
        step: number;
      };
    }
  | {
      type: typeof TOGGLE_TIMER;
    }
  | {
      type: typeof SET_TIMER_REF;
      payload: {
        timerRef: TimerState['timerRef'];
      };
    };

const timerInitialState: TimerState = {
  seconds: 0,
  isRunning: false,
  timerRef: null,
};

const timerStateReducer = (
  state: TimerState = timerInitialState,
  action: TimerStateAction
): TimerState => {
  let nextState: TimerState | null = null;

  switch (action.type) {
    case INCREMENT_SECONDS:
      nextState = {
        ...state,
        seconds: state.seconds + action.payload.step,
      };
      break;
    case TOGGLE_TIMER:
      nextState = {
        ...state,
        isRunning: !state.isRunning,
      };
      break;
    case SET_TIMER_REF:
      nextState = {
        ...state,
        timerRef: action.payload.timerRef,
      };
      break;
    default:
  }

  return nextState ?? state;
};

export const incrementSeconds = (
  step: number,
  dispatch: Dispatch<TimerStateAction> = store.dispatch
) => {
  // Increment Seconds
  dispatch({
    type: INCREMENT_SECONDS,
    payload: {
      step,
    },
  });

  // Fetch dummy Data
  const { timer, todos } = store.getState();
  if (timer.seconds > 2 && todos.todos == null)
    fetchTodos(dispatch as unknown as Dispatch<TodosStateAction>);
};

export const toggleTimer = (
  dispatch: Dispatch<TimerStateAction> = store.dispatch
) => {
  const { timer } = store.getState();

  dispatch({
    type: TOGGLE_TIMER,
  });

  // Clear Interval
  if (timer.timerRef != null) {
    clearInterval(timer.timerRef);
    setTimerRef(null);
  }

  // Start Interval
  // Note: Not using 'timer.isRunning' as the destructed timer
  // has still the old 'isRunning' value before toggling it via 'toggle()' (due to Redux destroys the reference when mutation)
  if (store.getState().timer.isRunning)
    setTimerRef(setInterval(() => incrementSeconds(0.1), 100));
};

export const setTimerRef = (
  timerRef: TimerState['timerRef'],
  dispatch: Dispatch<TimerStateAction> = store.dispatch
) => {
  dispatch({
    type: SET_TIMER_REF,
    payload: {
      timerRef,
    },
  });
};

// =========================================================================================================
// Todos Reducer and Actions
// =========================================================================================================

type TodosState = {
  todos: string[] | null;
};

const SET_TODOS = 'set_todos';

type TodosStateAction = {
  type: typeof SET_TODOS;
  payload: {
    value: TodosState['todos'];
  };
};

const todoInitialState: TodosState = {
  todos: null,
};

const todosStateReducer = (
  state: TodosState = todoInitialState,
  action: TodosStateAction
): TodosState => {
  let nextState: TodosState | null = null;

  switch (action.type) {
    case SET_TODOS:
      nextState = {
        ...state,
        todos: action.payload.value,
      };
      break;
    default:
  }

  return nextState ?? state;
};

export const fetchTodos = async (
  dispatch: Dispatch<TodosStateAction> = store.dispatch
) => {
  const response = await fetch('/data.json');
  const parsedJson = await response.json();

  dispatch({
    type: SET_TODOS,
    payload: {
      value: parsedJson,
    },
  });
};

// =========================================================================================================
// Store
// =========================================================================================================

export const reducers = combineReducers({
  timer: timerStateReducer,
  todos: todosStateReducer,
});

export const store = createStore(reducers);

type RootState = ReturnType<typeof store.getState>;

export const selectSeconds = (state: RootState) => state.timer.seconds;
export const selectIsRunning = (state: RootState) => state.timer.isRunning;
export const selectTodos = (state: RootState) => state.todos.todos;
