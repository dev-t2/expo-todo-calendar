import { memo } from 'react';
import { NextPage } from 'next';

import CreateTodo from '../components/CreateTodo';

const Todo: NextPage = () => {
  return <CreateTodo />;
};

export default memo(Todo);
