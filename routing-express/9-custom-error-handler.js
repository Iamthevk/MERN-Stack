const express = require("express");
const app = express();

app.get("/", (request, response, next) => {
  try {
    throw new Error("Oh no! something went wrong");
  } catch (err) {
    next(err);
  }
});

// A custom error handler middleware function can be written as well
// and it looks pretty much the same as route handlers do with the exception
// that an error handler function middleware expects to receive four arguments
app.use((error, request, response, next) => {
  response.end(error.message);
});

app.listen(1337, () => console.log("Web Server running on port 1337"));
