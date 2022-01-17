import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRunning, toggleTimer } from '../store';

const TimerToggleView: React.FC = () => {
  const isRunning = useSelector(selectIsRunning);
  const dispatch = useDispatch();

  return (
    <Container>
      <button onClick={() => toggleTimer(dispatch)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </Container>
  );
};

export default TimerToggleView;

const Container = styled.div`
  margin-bottom: 20px;
`;
