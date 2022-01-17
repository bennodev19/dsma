import React from 'react';
import styled from 'styled-components';
import { useTimerStore } from '../store';

const TimerDisplayView: React.FC = () => {
  // Selector
  const seconds = useTimerStore((store) => store.seconds);

  return (
    <Text>
      <span>Stopwatch:</span> <span>{seconds.toFixed(1)}</span>
    </Text>
  );
};

export default TimerDisplayView;

const Text = styled.p`
  font-size: 20px;
`;
