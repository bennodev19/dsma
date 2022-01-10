import React from 'react';
import { useAtom } from 'jotai';
import { secondsAtom } from '../store';
import styled from 'styled-components';

const TimerDisplayView: React.FC = () => {
  const [seconds] = useAtom(secondsAtom);

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
