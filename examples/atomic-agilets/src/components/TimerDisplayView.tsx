import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { SECONDS } from '../store';

const TimerDisplayView: React.FC = () => {
  const seconds = useAgile(SECONDS);

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
