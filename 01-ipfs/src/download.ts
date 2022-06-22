import { create } from 'ipfs-core';

const main = async () => {
  try {
    const node = await create();

    const stream = node.cat('QmWSeKapxeDKYBYhLmPTAXV2N1N4LNHwvjbqdc3PVfcJ2m');
    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    console.log(chunks.toString());
  } catch (error) {
    console.error(error);
  }
};

main();
