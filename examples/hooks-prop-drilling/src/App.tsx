import React from 'react';
import styled from 'styled-components';
import TimerDisplayView from './components/TimerDisplayView';
import TimerToggleView from './components/TimerToggleView';
import TodosView from './components/TodosView';
import { useApplicationState } from './store';

const App: React.FC = () => {
  const { seconds, isRunning, todos, toggleTimer } = useApplicationState();
  return (
    <Container>
      <Title>Hooks - Prop Drilling</Title>
      <TimerDisplayView seconds={seconds} />
      <TimerToggleView isRunning={isRunning} toggleTimer={toggleTimer} />
      <TodosView todos={todos} />
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
