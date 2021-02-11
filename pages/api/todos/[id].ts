import { NextApiRequest, NextApiResponse } from 'next';
import { isTodos, toggleTodos } from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const id = Number(req.query.id);

      if (!(await isTodos(id))) return res.status(404).end();

      const toggledTodos = await toggleTodos(id);

      return res.status(200).send(toggledTodos);
    } catch (e) {
      console.error(e);

      return res.status(500).send(e);
    }
  }

  return res.status(404).end();
};
