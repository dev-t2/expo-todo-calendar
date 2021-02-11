import Axios from 'axios';

import { TodoType } from '../../types/todo';

const axios = Axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getTodosAPI = async () => {
  try {
    return await axios.get<TodoType[]>('/todos');
  } catch (e) {
    console.error(e);
  }
};

export const checkTodoAPI = async (id: number) => {
  try {
    return await axios.patch(`/todos/${id}`);
  } catch (e) {
    console.error(e);
  }
};
