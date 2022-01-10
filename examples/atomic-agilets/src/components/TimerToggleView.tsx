import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { IS_RUNNING, toggleTimer } from '../store';

const TimerToggleView: React.FC = () => {
  const isRunning = useAgile(IS_RUNNING);

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
