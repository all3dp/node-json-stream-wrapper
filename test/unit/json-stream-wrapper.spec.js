import jsonStreamWrapper from '../../src';

import stream from 'stream';
import assign from 'lodash/fp/assign';
import * as referee from '@sinonjs/referee'

const expect = referee.expect

describe('JsonStreamWrapper', function() {

  function streamToObject(stream, cb) {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      cb(JSON.parse(chunks.join('')));
    });
  }

  it('should insert stream data in right json attribute', function(done) {
    const jsonInput = {a: 1};
    const data = '__SOME_TEST_DATA__';
    const inputStream = new stream.PassThrough();
    inputStream.end(Buffer.from(data));

    const outputStream = inputStream.pipe(jsonStreamWrapper(jsonInput, 'streamData'));

    streamToObject(outputStream, (object) => {
      expect(object).toEqual(assign(jsonInput, {streamData: data}));
      done();
    });
  });

  //  it('it breaks if there are unescaped ', function(done) {
  //    const jsonInput = {a: 1};
  //    const data = '__SOME_TEST_DATA_WITH_"__';
  //    const inputStream = new stream.PassThrough();
  //    inputSt  ream.end(new Buffer(data));
  //
  //    const outpuStream = inputStream.pipe(jsonStreamWrapper(jsonInput, 'streamData'));
  //
  //    expect(streamToObject(outpuStream, (object) => {
  //      expect(object).toEqual(assign(jsonInput, {streamData: data}));
  //    })).toThrow();
  //  });

});
