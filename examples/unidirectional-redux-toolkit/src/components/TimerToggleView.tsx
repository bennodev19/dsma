import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsRunning, toggleTimer } from '../store';

const TimerToggleView: React.FC = () => {
  const isRunning = useSelector(selectIsRunning);
  const dispatch = useDispatch();

  return (
    <Container>
      <button onClick={() => dispatch(toggleTimer())}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </Container>
  );
};

export default TimerToggleView;

const Container = styled.div`
  margin-bottom: 20px;
`;
