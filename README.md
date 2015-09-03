# node-json-stream-wrapper
A stream wrapper which wraps a stream into a JSON object

[![Build Status](https://travis-ci.org/all3dp/node-json-stream-wrapper.svg)](https://travis-ci.org/all3dp/node-json-stream-wrapper)

# Example Usage

```javascript
import jsonStreamWrapper, {Base64Stream} from 'json-stream-wrapper';

import {createReadStream} from 'fs';
import {post} from 'request';

createReadStream('<example-file>')
  .pipe(new Base64Stream())
  .pipe(jsonStreamWrapper({example: 1}, 'file'))
  .pipe(post({
      url: 'http://target',
      json: true
    }));
    
// body of the http-request of the target-server:
// {
//    "example" : 1,
//    "file" : "<FILE_CONTENT_IN_BASE64>"
// }
```

or:

```javascript
import jsonStreamWrapper, {Base64Stream} from 'json-stream-wrapper';

import {createReadStream} from 'fs';

let fstream = createReadStream('<example-file>');

const foo = fstream
  .pipe(new Base64Stream())
  .pipe(jsonStreamWrapper({example: 1}, 'file'));

streamToObject(foo, (obj) => {
  console.log(obj);
  // output:
  // {
  //    "example" : 1,
  //    "file" : "<FILE_CONTENT_IN_BASE64>"
  // }

});



function streamToObject(stream, cb) {
  const chunks = [];
  stream.on('data', (chunk) => {
    chunks.push(chunk);
  });
  stream.on('end', () => {
    cb(JSON.parse(chunks.join('')));
  });
}

```
