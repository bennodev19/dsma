import React from 'react';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { timerStore, toggleTimer } from '../store';

const TimerToggleView: React.FC = () => {
  const { isRunning } = useSnapshot(timerStore);

  return (
    <Container>
      <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
    </Container>
  );
};

export default TimerToggleView;

const Container = styled.div`
  margin-bottom: 20px;
`;
