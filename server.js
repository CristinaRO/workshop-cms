var http = require('http');
var querystring = require('querystring');
var handler = require('./src/handler.js');

var message = 'Hurray NodeGirls!';

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log('Welcome to the SERVER. Listening on port 3000. Ready to roll!')
});
