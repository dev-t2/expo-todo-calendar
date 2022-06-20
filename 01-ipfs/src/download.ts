import { create } from 'ipfs-core';

const PATH = 'QmWSeKapxeDKYBYhLmPTAXV2N1N4LNHwvjbqdc3PVfcJ2m';

const main = async () => {
  try {
    const node = await create();
    const stream = node.cat(PATH);
    const data = [];

    for await (const chunk of stream) {
      data.push(chunk);
    }

    console.log(data.toString());
  } catch (error) {
    console.error(error);
  }
};

main();
