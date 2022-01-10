import { useEffect } from 'react';
import {
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';

export const todosAtom = atom<string[] | null>({
  key: 'todos',
  default: null,
});
export const secondsAtom = atom({ key: 'seconds', default: 0 });
export const runningAtom = atom({ key: 'running', default: false });

export const useStopwatch = () => {
  const [seconds, setSeconds] = useRecoilState(secondsAtom);
  const setTodos = useSetRecoilState(todosAtom);
  const running = useRecoilValue(runningAtom);

  // Fetch dummy Data
  useEffect(() => {
    const fetchDummyData = async () => {
      if (seconds > 2) {
        const response = await fetch('/data.json');
        const parsedJson = await response.json();
        setTodos(parsedJson);
      }
    };
    fetchDummyData();
  }, [seconds > 2]);

  useEffect(() => {
    if (running) {
      // Start Interval
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);

      // Clear Interval
      return () => clearInterval(interval);
    }
  }, [running]);
};
