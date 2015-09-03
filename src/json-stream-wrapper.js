import {Transform} from 'stream';

class JsonStreamWrapper extends Transform {

  constructor(jsonData, streamDataAttribute) {
    super();
    this.streamDataAttribute = streamDataAttribute;
    this.jsonData = jsonData;
    this.firstCall = true;
  }

  _transform(chunk, encoding, done) {
    if (this.firstCall) {
      this.push(JSON.stringify(this.jsonData).slice(0, -1) + `,"${this.streamDataAttribute}":"`, 'utf8');
      this.firstCall = false;
    }
    this.push(chunk, 'utf8');
    done();
  }

  _flush(done) {
    this.push('"}', 'utf8');
    done();
  }
}

export default function(jsonData, streamDataAttribute) {
  return new JsonStreamWrapper(jsonData, streamDataAttribute);
}
