import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const result = await fs.readFile('./data/todos.json');
      const todos = JSON.parse(result.toString());

      return res.status(200).send(todos);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  return res.status(404).end();
};
