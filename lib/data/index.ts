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

export const isTodos = async (id: number) => {
  const todos = await getTodos();

  return todos.some((todo) => todo.id === id);
};

export const toggleTodos = async (id: number) => {
  const todos = await getTodos();
  const toggledTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, checked: !todo.checked } : todo
  );

  await fs.writeFile('./data/todos.json', JSON.stringify(toggledTodos));

  return toggledTodos;
};
