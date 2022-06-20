import * as IPFS from 'ipfs-core';
import fs from 'fs/promises';

const main = async () => {
  const ipfs = await IPFS.create();
  const file = await fs.readFile('./file.txt');
  const result = await ipfs.add(file);

  console.log(result);
};

main();
