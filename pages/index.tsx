import { memo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Axios from 'axios';

import { TodosType, TodoType } from '../types/todo';
import TodoList from '../components/TodoList';

const Index: NextPage<TodosType> = ({ todos }) => {
  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await Axios.get<TodoType[]>(`${process.env.NEXT_PUBLIC_API_URL}/todos`);

    return { props: { todos: data } };
  } catch (e) {
    return { props: { todos: [] } };
  }
};

export default memo(Index);
