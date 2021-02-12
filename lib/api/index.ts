import Axios from 'axios';

import { TodoType } from '../../types/todo';

const axios = Axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getTodosAPI = async () => {
  return await axios.get<TodoType[]>('/');
};

export const checkTodoAPI = async (id: number) => {
  return await axios.patch(`/${id}`);
};

interface ITodo {
  text: string;
  color: string;
}

export const createTodoAPI = async (todo: ITodo) => {
  return await axios.post('/', todo);
};

export const deleteTodoAPI = async (id: number) => {
  return await axios.delete(`/${id}`);
};
