import React from 'react';
import styled from 'styled-components';
import { useApplicationContext } from '../store';

const TimerToggleView: React.FC = () => {
  const { isRunning, toggleTimer } = useApplicationContext();

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
