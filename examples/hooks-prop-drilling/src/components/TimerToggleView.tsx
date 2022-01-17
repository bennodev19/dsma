import React from 'react';
import styled from 'styled-components';

const TimerToggleView: React.FC<Props> = (props) => {
  const { toggleTimer, isRunning } = props;

  return (
    <Container>
      <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
    </Container>
  );
};

export default TimerToggleView;

type Props = {
  isRunning: boolean;
  toggleTimer: () => void;
};

const Container = styled.div`
  margin-bottom: 20px;
`;
