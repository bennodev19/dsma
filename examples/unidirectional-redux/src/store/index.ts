type TimerState = {
  seconds: number;
  isRunning: boolean;
  timerRef: number | null;
};

const INCREMENT_SECONDS = 'increment_seconds';
const TOGGLE_TIMER = 'toggle_timer';

type TimerStateAction =
  | {
      type: typeof INCREMENT_SECONDS;
      payload: {
        value: number;
      };
    }
  | {
      type: typeof TOGGLE_TIMER;
    };

const initialState: TimerState = {
  seconds: 0,
  isRunning: false,
  timerRef: null,
};

const timerStateReducer = (
  state: TimerState,
  action: TimerStateAction
): TimerState => {
  let nextState: TimerState | null = null;

  switch (action.type) {
    case INCREMENT_SECONDS:
      nextState = {
        ...state,
        seconds: state.seconds + 0.1,
      };
      break;
    case TOGGLE_TIMER:
      break;
    default:
  }

  return nextState ?? state;
};

// TODO
