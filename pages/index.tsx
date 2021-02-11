import { memo, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { TodosType } from '../types/todo';
import TodoList from '../components/TodoList';
import { getTodosAPI } from '../lib/api';

const Index: NextPage<TodosType> = ({ todos }) => {
  const router = useRouter();

  useEffect(() => {
    if (todos.length === 0) {
      router.replace('/todo');
    }
  }, []);

  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const result = await getTodosAPI();

    return { props: { todos: result?.data } };
  } catch (e) {
    return { props: { todos: [] } };
  }
};

export default memo(Index);
