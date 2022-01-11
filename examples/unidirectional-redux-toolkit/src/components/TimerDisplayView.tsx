import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectSeconds } from '../store';

const TimerDisplayView: React.FC = () => {
  const seconds = useSelector(selectSeconds);

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
