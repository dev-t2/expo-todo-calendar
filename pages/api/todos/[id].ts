import { NextApiRequest, NextApiResponse } from 'next';
import { isExistTodo, checkTodo } from '../../../lib/data';

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

  return res.status(404).end();
};
