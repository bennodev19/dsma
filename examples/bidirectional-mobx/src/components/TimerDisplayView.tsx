import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import store from '../store';

const TimerDisplayView: React.FC = () => {
  return (
    <Text>
      <span>Stopwatch:</span> <span>{store.seconds.toFixed(1)}</span>
    </Text>
  );
};

export default observer(TimerDisplayView);

const Text = styled.p`
  font-size: 20px;
`;
