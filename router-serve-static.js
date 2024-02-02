const express = require("express");
const path = require("path");
const app = express();

const staticRouter = express.Router();

const assets = {
  first: path.join(__dirname, "./public"),
  second: path.join(__dirname, "./another-public"),
};
staticRouter
  .use(express.static(assets.first))
  .use(express.static(assets.second));

app.use("/", staticRouter);

app.listen(1342, () => console.log("Web Server running on port 1342"));

//If two or more files with the same name exist under different directories, only the first one found will be displayed on the client-side.
