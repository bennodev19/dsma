import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { runningAtom } from '../store';

const TimerToggleView: React.FC = () => {
  const [running, setRunning] = useRecoilState(runningAtom);

  return (
    <Container>
      <button onClick={() => setRunning(!running)}>
        {running ? 'Stop' : 'Start'}
      </button>
    </Container>
  );
};

export default TimerToggleView;

const Container = styled.div`
  margin-bottom: 20px;
`;
