const express = require("express");
const loggerMiddleware = require("./6-middleware-logger");
const app = express();

//A common pattern for writing middleware functions is to wrap the middleware function inside another function.
//The result of doing so is a configurable middleware function. They are also higher-order functions.

app.use(
  loggerMiddleware({
    enable: true,
  })
);

app.listen(1337, () => console.log("Web Server running on port 1337"));
