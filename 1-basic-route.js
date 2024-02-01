const express = require("express");
const app = express();
// console.log(app);

app.get("/", (request, response, nextHandler) => {
  response.status(200).send("Hello from ExpressJS");
});

app.listen(1337, () => console.log("Web server running on port 1337"));
