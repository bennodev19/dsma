import React from 'react';
import styled from 'styled-components';
import { useStopwatch } from './store';
import TimerDisplayView from './components/TimerDisplayView';
import TimerToggleView from './components/TimerToggleView';
import TodosView from './components/TodosView';

const App: React.FC = () => {
  useStopwatch();
  return (
    <Container>
      <Title>Atomic - Recoil</Title>
      <TimerDisplayView />
      <TimerToggleView />
      <TodosView />
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
`;
