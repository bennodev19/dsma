import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { todosAtom } from '../store';

const TodosView: React.FC = () => {
  const todos = useRecoilValue(todosAtom);

  return (
    <Container>
      <Title>Data</Title>
      <Text>{todos != null ? JSON.stringify(todos) : 'No data fetched!'}</Text>
    </Container>
  );
};

export default TodosView;

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
