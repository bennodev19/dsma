import React from 'react';
import styled from 'styled-components';
import { useTimerStore } from '../store';

const TimerToggleView: React.FC = () => {
  const { isRunning, toggleTimer } = useTimerStore();

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
