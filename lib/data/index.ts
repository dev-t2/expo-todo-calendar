import fs from 'fs/promises';
import { TodoType } from '../../types/todo';

export const getTodos = async () => {
  try {
    const result = await fs.readFile('./data/todos.json');
    const todos: TodoType[] = JSON.parse(result.toString());

    return todos;
  } catch (e) {
    console.error(e);

    return [];
  }
};

export const isExistTodo = async (id: number) => {
  try {
    const todos = await getTodos();

    return todos.some((todo) => todo.id === id);
  } catch (e) {
    console.error(e);

    return false;
  }
};

export const setTodos = async (todos: TodoType[]) => {
  try {
    await fs.writeFile('./data/todos.json', JSON.stringify(todos));
  } catch (e) {
    console.error(e);
  }
};

export const checkTodo = async (id: number) => {
  try {
    let todos = await getTodos();

    const updatedTodos = todos?.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );

    await setTodos(updatedTodos);

    return await getTodos();
  } catch (e) {
    console.error(e);

    return [];
  }
};
