const express = require("express");
const app = express();

//A router is just a class that allows developers to write mountable and modular route handlers.
const miniapp = express.Router();

miniapp.get("/home", (request, response, next) => {
  const url = request.originalUrl;
  response.status(200).send(`You are visiting /home from ${url}`);
});

//Mount your modular mini-application to "/first" path, and to "/second" path
app.use("/first", miniapp);
app.use("/second", miniapp);

app.listen(1339, () => console.log("Web Server running on port 1339"));
