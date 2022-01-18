import React from 'react';
import styled from 'styled-components';
import { useApplicationContext } from '../store';

const TimerDisplayView: React.FC = () => {
  const { seconds } = useApplicationContext();

  return (
    <Text>
      <span>Stopwatch:</span> <span>{seconds.toFixed(2)}</span>
    </Text>
  );
};

export default TimerDisplayView;

const Text = styled.p`
  font-size: 20px;
`;
