import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { timerStore } from '../store';

const TimerDisplayView: React.FC = () => {
  const { seconds } = timerStore;
  return (
    <Text>
      <span>Stopwatch:</span> <span>{seconds.toFixed(1)}</span>
    </Text>
  );
};

export default observer(TimerDisplayView);

const Text = styled.p`
  font-size: 20px;
`;
