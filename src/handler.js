var fs = require('fs');
var qs = require('querystring');

function handler(request, response) {
  var endpoint = request.url,
      method = request.method,
      data = '',
      parsedData = '',
      existingPosts;
  var pathToIndex = __dirname + '/../public/index.html';

  console.log(method, endpoint);

  if (endpoint == '/') {
    fs.readFile(pathToIndex, function(error, file) {
      if (error) {
        console.log(error);
        return;
      }

      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(file);
    });
  } else if (endpoint == '/create/post') {
    request.on('data', function(dataChunk) {
      data += dataChunk;
    });

    request.on('end', function() {
      fs.readFile(__dirname + '/posts.json', function(error, jsonPosts) {
        if (error) {
          console.log(error);
          return;
        }

        existingPosts = JSON.parse(jsonPosts);
        console.log(existingPosts);

        parsedData = qs.parse(data);
        console.log('Parsed data:', parsedData);

        var postContent = parsedData['post'];
        console.log('Post content:', postContent);

        var timestamp = Date.now();
        existingPosts[timestamp] = postContent;

        var stringData = JSON.stringify(existingPosts);
        console.log(stringData);

        fs.writeFile(__dirname + '/posts.json', stringData, function (error) {
          if (error)
            console.log("ERROR", error);

          response.writeHead(302, {"Location": "/"});
          response.end();
        });
      });
    });
  } else if (endpoint == '/posts') {
    fs.readFile(__dirname + '/posts.json', function(error, jsonPosts) {
      if (error) {
        console.log(error);
        return;
      }

      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(jsonPosts);
    });
  } else {
    if (endpoint == '/')
      endpoint = '/index.html';

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
