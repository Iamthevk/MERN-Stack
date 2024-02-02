const express = require("express");
const app = express();
const router = express.Router();

router.use((request, response, next) => {
  if (!request.query.id) {
    //it passes control to the next handler outside of the router with next('router')
    next("router");
  } else {
    //an id was provided in the query, the middleware function in the router will pass control to the next handler inside the router with next()
    next();
  }
});

router.get("/", (request, response, next) => {
  const id = request.query.id;
  response.send(`You specified a user ID => ${id}`);
});

app.get("/", router, (request, response, next) => {
  response.status(400).send("A user ID needs to be specified");
});

app.listen(1338, () => console.log("Web Server running on port 1338"));
