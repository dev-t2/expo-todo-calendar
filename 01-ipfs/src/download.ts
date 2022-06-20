import { create } from 'ipfs-core';

const main = async () => {
  try {
    const node = await create();

    const stream = node.cat('QmVnNM8Gj1bqu4PSKBCzxfLRKHjDMTTesABquBXmZ9SfLn');
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    console.log(chunks.toString());
  } catch (error) {
    console.error(error);
  }
};

main();
