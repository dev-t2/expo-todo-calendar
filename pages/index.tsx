import { memo, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { wrapper } from '../store';

import { TodosType } from '../types/todo';
import { getTodosAPI } from '../lib/api';
import TodoList from '../components/TodoList';
import { todoActions } from '../store/todo';

const Index: NextPage<TodosType> = ({ todos }) => {
  const router = useRouter();

  useEffect(() => {
    if (todos.length === 0) {
      router.replace('/todo');
    }
  }, []);

  return <TodoList todos={todos} />;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  try {
    const { data } = await getTodosAPI();

    store.dispatch(todoActions.setTodo(data));

    return { props: { todos: data } };
  } catch (e) {
    return { props: { todos: [] } };
  }
});

export default memo(Index);
