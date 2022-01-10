import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import store from '../store';

const TodosView: React.FC = () => {
  return (
    <Container>
      <Title>Data</Title>
      <Text>
        {store.todos != null ? JSON.stringify(store.todos) : 'No data fetched!'}
      </Text>
    </Container>
  );
};

export default observer(TodosView);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 10px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Text = styled.p`
  margin: 10px 0 0 0;
`;
