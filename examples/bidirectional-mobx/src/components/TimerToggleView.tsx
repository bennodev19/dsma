import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import store from '../store';

const TimerToggleView: React.FC = () => {
  return (
    <Container>
      <button onClick={store.toggleTimer}>
        {store.running ? 'Stop' : 'Start'}
      </button>
    </Container>
  );
};

export default observer(TimerToggleView);

const Container = styled.div`
  margin-bottom: 20px;
`;
