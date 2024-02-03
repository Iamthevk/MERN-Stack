const express = require("express");
const fs = require("fs");
const app = express();

app.engine("tpl", (filepath, options, callback) => {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      return callback(err);
    }
    const content = data.toString().replace(/%[a-z]+%/gi, (match) => {
      const variable = match.replace(/%/g, "");
      if (Reflect.has(options, variable)) {
        return options[variable];
      }
      return match;
    });
    return callback(null, content);
  });
});

//Define the path where the views are located
app.set("views", "./views");

//Tell ExpressJS to use our template engine
app.set("view engine", "tpl");

app.get("/", (request, response, next) => {
  response.render("home", {
    title: "Hello",
    description: "World!",
  });
});

app.listen(1337, () => console.log("Web Server running on port 1337"));
