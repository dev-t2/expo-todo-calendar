import { NextApiRequest, NextApiResponse } from 'next';
import { isExistTodo, checkTodo, getTodos, setTodos } from '../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const id = Number(req.query.id);

      if (!(await isExistTodo(id))) return res.status(404).end();

      const checkedTodos = await checkTodo(id);

      return res.status(200).send(checkedTodos);
    } catch (e) {
      console.error(e);

      return res.status(500).send(e);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const id = Number(req.query.id);

      if (!isExistTodo(id)) return res.status(404).end();

      const todos = await getTodos();
      const filteredTodos = todos.filter((todo) => todo.id !== id);

      await setTodos(filteredTodos);

      return res.status(200).send(filteredTodos);
    } catch (e) {
      console.error(e);

      return res.status(500).send(e);
    }
  }

  return res.status(404).end();
};
