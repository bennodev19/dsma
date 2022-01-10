import React from 'react';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { store } from '../store';

const TimerDisplayView: React.FC = () => {
  const { seconds } = useSnapshot(store);

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
