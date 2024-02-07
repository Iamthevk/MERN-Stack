const express = require("express");
const app = express();
const router = express.Router();

// Router-level middleware functions are only executed inside a router.
// They are usually used when applying a middleware to a mount point only or to a specific path.

router.use((request, response, next) => {
  console.log("URL:", request.originalUrl);
  next();
});

//Mount the Router to the path "/router"
app.use("/router", router);

app.listen(1337, () => console.log("Web Server running on port 1337"));
