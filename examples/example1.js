import jsonStreamWrapper, {Base64Stream} from '../src';

import {createReadStream} from 'fs';
import {post} from 'request';

let fstream = createReadStream('./README.md');

const foo = fstream
  .pipe(new Base64Stream())
  .pipe(jsonStreamWrapper({example: 1}, 'file'));

streamToObject(foo, (obj) => {
  console.log(obj);
});


fstream
  .pipe(new Base64Stream())
  .pipe(jsonStreamWrapper({example: 1}, 'file'))
  .pipe(post({
      url: 'http://target',
      json: true
    }));

function streamToObject(stream, cb) {
  const chunks = [];
  stream.on('data', (chunk) => {
    chunks.push(chunk);
  });
  stream.on('end', () => {
    cb(JSON.parse(chunks.join('')));
  });
}
