var http = require('http');
var fs = require('fs');

var message = 'Hurray NodeGirls!';

function handler(request, response) {
  var endpoint = request.url,
      method   = request.method;

  console.log(method, ' ', endpoint);

  if (endpoint === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});

    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }

      response.end(file);
    });

  } else {
    if (endpoint == '/node') {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(message);
      response.end();
    } else if (endpoint == '/girls') {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write('Girls just wanna have respect, equal pay, and equal opportunities!');
      response.end();
    } else {
      if (endpoint.indexOf('css') > 0)
        response.writeHead(200, {"Content-Type": "text/css"});
      else if (endpoint.indexOf('png') > 0 )
        response.writeHead(200, {"Content-Type": "image/png"});

      fs.readFile(__dirname + '/public' + endpoint, function(error, file) {
        if (error) {
          console.log(error);
          return;
        }

        response.end(file);
      });
    }
  }
}

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log('Welcome to the SERVER. Listening on port 3000. Ready to roll!')
});
