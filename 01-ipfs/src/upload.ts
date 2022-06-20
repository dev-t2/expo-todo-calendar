import { create } from 'ipfs-core';
import { readFile } from 'fs/promises';
import { join } from 'path';

const main = async () => {
  try {
    const node = await create();
    const data = await readFile(join(__dirname, 'data.txt'));
    const result = await node.add(data);

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

main();
