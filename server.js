var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var message = 'Hurray NodeGirls!';

function handler(request, response) {
  var endpoint = request.url,
      method   = request.method,
      allTheData = '';

  console.log(method, ' ', endpoint);

  // if (method == 'GET') {
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
      } else if (endpoint == '/create-post') {
        request.on('data', function(theData) {
          console.log('This is', theData);
          allTheData += theData;
        });

        request.on('end', function() {
          var convertedData = querystring.parse(allTheData);

          console.log("ALL THE DATA", allTheData);
          console.log("Converted data", convertedData);

          response.writeHead(302, {"Location": "/"});
          response.end();
        });
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
  // }

  // if (method == 'POST') {
    // request.on('data', function(theData) {
    //   console.log('This is', theData);
    //   allTheData += theData;
    // });

    // request.on('end', function() {
    //   var convertedData = querystring.parse(allTheData);

    //   console.log("ALL THE DATA", allTheData);
    //   console.log("Converted data", convertedData);

    //   response.writeHead(302, {"Location": "/"});
    //   response.end();
    // });
  // }
}

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log('Welcome to the SERVER. Listening on port 3000. Ready to roll!')
});
