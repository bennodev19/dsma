import React from 'react';
import styled from 'styled-components';
import { useApplicationState } from '../store';

const TimerDisplayView: React.FC = () => {
  const { seconds } = useApplicationState();

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
