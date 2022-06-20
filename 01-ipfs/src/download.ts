import { create } from 'ipfs-core';

const PATH = 'QmWSeKapxeDKYBYhLmPTAXV2N1N4LNHwvjbqdc3PVfcJ2m';

const main = async () => {
  try {
    const node = await create();

    const stream = node.cat(PATH);
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const data = chunks.toString();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

main();
