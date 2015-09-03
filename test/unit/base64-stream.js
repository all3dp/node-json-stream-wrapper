import {Base64Stream} from '../../src';

import stream from 'stream';

describe('Base64Stream', function() {

  function streamToString(stream, cb) {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      cb(chunks.join(''));
    });
  }

  it('working base64 encoder', (done) => {
    const data = 'Test';
    const inputStream = new stream.PassThrough();
    inputStream.end(new Buffer(data));

    const outputStream = inputStream.pipe(new Base64Stream());

    streamToString(outputStream, (str) => {
      expect(str).toEqual('VGVzdA==');
      done();
    });

  });

});
