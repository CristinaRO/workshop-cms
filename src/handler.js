var fs = require('fs');
var qs = require('querystring');

function handler(request, response) {
  var endpoint = request.url,
      method = request.method,
      data = '';

  console.log(method, endpoint);

  if (endpoint === '/')
    endpoint = '/index.html';

  if (endpoint == '/create/post') {
    request.on('data', function(dataChunk) {
      data += dataChunk;
    });

    request.on('end', function() {
      console.log('Parsed data', qs.parse(data));

      response.writeHead(302, {"Location": "/"});
      response.end();
    });
  } else {
    fs.readFile(__dirname + '/../public' + endpoint, function(error, file) {
      if (error) {
        console.log(error);
        return;
      }

      response.end(file);
    });
  }
}

module.exports = handler;
