import React from 'react';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { timerStore } from '../store';

const TimerDisplayView: React.FC = () => {
  const { seconds } = useSnapshot(timerStore);

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
