var http = require('http');
var fs = require('fs');

var message = 'Hurray NodeGirls!';

function handler(request, response) {
  var endpoint = request.url,
      method   = request.method;

  console.log(method, ' ', endpoint);
  response.writeHead(200, {"Content-Type": "text/html"});

  if (endpoint === '/') {
    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }

      response.end(file);
    });

  } else {
    if (endpoint == '/node') {
      response.write(message);
    } else if (endpoint == '/girls') {
      response.write('Girls just wanna have respect, equal pay, and equal opportunities!');
    } else {
      response.write('Default response');
    }

    response.end();
  }
}

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log('Welcome to the SERVER. Listening on port 3000. Ready to roll!')
});
