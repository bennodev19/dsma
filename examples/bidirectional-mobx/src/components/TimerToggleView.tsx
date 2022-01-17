import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { timerStore } from '../store';

const TimerToggleView: React.FC = () => {
  const { toggleTimer, isRunning } = timerStore;
  return (
    <Container>
      <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
    </Container>
  );
};

export default observer(TimerToggleView);

const Container = styled.div`
  margin-bottom: 20px;
`;
