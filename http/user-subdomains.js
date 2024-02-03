const express = require("express");
const vhost = require("vhost");
const app = express();

const users = express.Router();
users.get("/", (request, response, next) => {
  // Use the vhost object to access the array of subdomains:
  const username = request.vhost[0]
    .split("-")
    .map((name) => name[0].toUpperCase() + name.slice(1))
    .join(" ");
  response.send(`Hello ${username}`);
});

//Mount the router:
app.use(vhost("*.localhost", users));

//Listen on port 1337 for new connections
app.listen(1342, () => console.log("Web Server running on port 1342"));
