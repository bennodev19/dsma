import React from 'react';
import styled from 'styled-components';

const TimerDisplayView: React.FC<Props> = (props) => {
  const { seconds } = props;

  return (
    <Text>
      <span>Stopwatch:</span> <span>{seconds.toFixed(2)}</span>
    </Text>
  );
};

export default TimerDisplayView;

type Props = {
  seconds: number;
};

const Text = styled.p`
  font-size: 20px;
`;
