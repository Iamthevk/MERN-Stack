const express = require("express");
const loggerMiddleware = require("./6-middleware-logger");
const app = express();

app.use(
  loggerMiddleware({
    enable: false,
  })
);

app.listen(1337, () => console.log("Web Server running on port 1337"));
