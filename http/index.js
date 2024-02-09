const http = require("http");

const handleRequest = (req, res) => {
  res.statusCode = 200;
  res.end(`<h1>Hello HTTP</h1>`);
};

const server = http.createServer(handleRequest);

server.listen(3000);
