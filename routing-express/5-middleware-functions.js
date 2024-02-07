const express = require("express");
const app = express();

// Middleware functions are mainly used to make changes in the request and response object
// They are executed in sequence, one after another,
// but if a middleware functions does not pass control to the next one, the request is left hanging.

app.use((request, response, next) => {
  request.allowed = Reflect.has(request.query, "allowme");
  next();
});

app.get("/", (request, response, next) => {
  if (request.allowed) {
    response.send(`Hello secret world!`);
  } else {
    response.send(`You are not allowed to enter`);
  }
});

app.listen(1340, () => console.log("Web Server running on port 1340"));
