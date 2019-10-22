import {Base64Stream} from '../../src';
import * as referee from '@sinonjs/referee'
import stream from 'stream';

const expect = referee.expect

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

  it('should implement working base64 encoder', (done) => {
    const data = 'Test';
    const inputStream = new stream.PassThrough();
    inputStream.end(Buffer.from(data));

    const outputStream = inputStream.pipe(new Base64Stream());

    streamToString(outputStream, (str) => {
      expect(str).toEqual('VGVzdA==');
      done();
    });

  });

});
