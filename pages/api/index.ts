import { NextApiRequest, NextApiResponse } from 'next';

import { getTodos, setTodos } from '../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const todos = await getTodos();

      return res.status(200).send(todos);
    } catch (e) {
      console.error(e);

      return res.status(500).send(e);
    }
  }

  if (req.method === 'POST') {
    const { text, color } = req.body;

    if (!text || !color) return res.status(400).send('text 또는 color가 없습니다.');

    try {
      const todos = await getTodos();

      let id = 1;

      if (todos.length) {
        id = todos[todos.length - 1].id + 1;
      }

      const todo = { id, text, color, checked: false };

      setTodos([...todos, todo]);

      return res.status(200).end();
    } catch (e) {
      console.error(e);

      return res.status(500).send(e);
    }
  }

  return res.status(404).end();
};
