import { create } from 'ipfs-http-client';
import fs from 'fs/promises';

const client = create();

const main = async () => {
  const file = await fs.readFile('./file.txt');
  const result = await client.add(file);

  console.log(result);
};

main();
