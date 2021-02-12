import { memo, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { RootState, wrapper } from '../store';
import { useSelector } from 'react-redux';

import { TodosType } from '../types/todo';
import { getTodosAPI } from '../lib/api';
import TodoList from '../components/TodoList';
import { todoActions } from '../store/todo';

const Index: NextPage<TodosType> = () => {
  const router = useRouter();
  const todos = useSelector((state: RootState) => state.todo.todos);

  useEffect(() => {
    if (todos.length === 0) {
      router.replace('/todo');
    }
  }, []);

  return <TodoList />;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  try {
    const { data } = await getTodosAPI();

    store.dispatch(todoActions.setTodo(data));

    return { props: {} };
  } catch (e) {
    console.error(e);

    return { props: {} };
  }
});

export default memo(Index);
