import { NextApiRequest, NextApiResponse } from 'next';

import { getTodos } from '../../../lib/data';

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

  return res.status(404).end();
};
