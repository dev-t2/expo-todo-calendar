import Axios from 'axios';

import { TodoType } from '../../types/todo';

const axios = Axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getTodosAPI = async () => {
  try {
    return await axios.get<TodoType[]>('/');
  } catch (e) {
    console.error(e);
  }
};

export const checkTodoAPI = async (id: number) => {
  try {
    return await axios.patch(`/${id}`);
  } catch (e) {
    console.error(e);
  }
};

interface ITodo {
  text: string;
  color: string;
}

export const createTodoAPI = async (todo: ITodo) => {
  try {
    return await axios.post('/', todo);
  } catch (e) {
    console.error(e);
  }
};
