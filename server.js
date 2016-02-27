var http = require('http');

var server = http.createServer();

server.listen(3000, function() {
  console.log('Welcome to the SERVER. Listening on port 3000. Ready to roll!')
});
