import {Transform} from 'stream';

class Base64Stream extends Transform {

  _transform(chunk, encoding, cb) {
    let baseStr = chunk;

    if (this.extra) {
      baseStr = Buffer.concat([this.extra, baseStr]);
      this.extra = null;
    }

    // 3 bytes are represented by 4 characters, so we can only encode in groups of 3 bytes
    let remaining = baseStr.length % 3;

    if (remaining !== 0) {
      // Store the extra bytes for later
      this.extra = baseStr.slice(baseStr.length - remaining);
      baseStr = baseStr.slice(0, baseStr.length - remaining);
    }

    // Convert chunk to a base 64 string
    baseStr = baseStr.toString('base64');

    // Push the chunk
    this.push(baseStr);
    cb();
  }

  _flush(cb) {
    if (this.extra) {
      this.push(this.extra.toString('base64'));
    }
    cb();
  }
}

export default Base64Stream;
