import { create } from 'ipfs-core';
import { readFile } from 'fs/promises';
import { join } from 'path';

const main = async () => {
  try {
    const ipfs = await create();
    const file = await readFile(join(__dirname, 'file.txt'));
    const result = await ipfs.add(file);

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

main();
