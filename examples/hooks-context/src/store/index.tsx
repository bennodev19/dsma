import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

type ApplicationState = {
  seconds: number;
  isRunning: boolean;
  todos?: string[];
};

type ApplicationStateWithActions = {
  toggleTimer: () => void;
} & ApplicationState;

const ApplicationContext = React.createContext<ApplicationStateWithActions>({
  seconds: 0,
  isRunning: false,
  toggleTimer: () => {
    /* void */
  },
});

const useApplicationState = (): ApplicationStateWithActions => {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  // Fetch dummy Data
  const { data } = useQuery<{
    todos: string[];
  }>(
    'fetch_todos',
    async () => {
      const response = await fetch('/data.json');
      const parsedJson = await response.json();
      return parsedJson;
    },
    {
      enabled: seconds > 2,
    }
  );

  React.useEffect(() => {
    if (isRunning) {
      // Start Interval
      const timerRef = setInterval(function incrementSeconds() {
        // Increment Seconds
        setSeconds((s) => s + 0.1);
      }, 100);

      // Clear Interval
      if (timerRef != null) return () => clearInterval(timerRef);
    }
  }, [isRunning]);

  return {
    seconds,
    isRunning,
    toggleTimer: () => setIsRunning((r) => !r),
    todos: data?.todos,
  };
};

const queryClient = new QueryClient();

export const InnerApplicationProvider: React.FC = (props) => {
  const { children } = props;
  return (
    <ApplicationContext.Provider value={useApplicationState()}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const ApplicationContextProvider: React.FC = (props) => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApplicationProvider>{children}</InnerApplicationProvider>
    </QueryClientProvider>
  );
};

export const useApplicationContext = () => React.useContext(ApplicationContext);
