import React from 'react';

interface ApplicationState {
  seconds: number;
  isRunning: boolean;
  todos?: string[];
  toggleTimer: () => void;
}

export const useApplicationState = (): ApplicationState => {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [todos, setTodos] =
    React.useState<ApplicationState['todos']>(undefined);

  // Fetch dummy Data
  React.useEffect(() => {
    const fetchDummyData = async () => {
      if (seconds > 2 && todos == null) {
        const response = await fetch('/data.json');
        const parsedJson = await response.json();
        setTodos(parsedJson.todos);
      }
    };
    fetchDummyData();
  }, [seconds > 2, todos == null]);

  React.useEffect(() => {
    if (isRunning) {
      // Start Interval
      const timerRef = setInterval(function incrementSeconds() {
        // Increment Seconds
        setSeconds((s) => s + 0.1);

        // Note: Doesn't work due to stale closure
        //       since the closure 'incrementSeconds()' still uses the 'seconds' from the initial render (due to the interval)
        // https://dmitripavlutin.com/react-hooks-stale-closures/
        // https://dmitripavlutin.com/simple-explanation-of-javascript-closures/
        // Can be solved by using 'useRef()' or outsourcing that logic into another 'useEffect()'
        // Fetch dummy Data
        // if (seconds > 2 && todos == null) {
        //   const response = await fetch('/data.json');
        //   const parsedJson = await response.json();
        //   setTodos(parsedJson.todos);
        // }
      }, 100);

      // Clear Interval
      if (timerRef != null) return () => clearInterval(timerRef);
    }
  }, [isRunning]);

  return {
    seconds,
    isRunning,
    toggleTimer: () => setIsRunning((r) => !r),
    todos,
  };
};
