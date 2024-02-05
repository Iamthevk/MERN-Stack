const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();

let data = [
  { id: uuid(), name: "Bob" },
  { id: uuid(), name: "Alice" },
];

const usr = {
  create(name) {
    const user = { id: uuid(), name };
    data.push(user);
    return user;
  },
  read(id) {
    if (id === "all") return data;
    return data.find((user) => user.id === id);
  },
  update(id, name) {
    const user = data.find((usr) => usr.id === id);
    if (!iuser) return { status: "user not found" };
    user.name = name;
    return user;
  },
  delete(id) {
    data = data.filter((user) => user.id !== id);
    return { status: "deleted", id };
  },
};
//Add a request handler for the post method that will be used as a Create operation.
//  A new user will be added to the data array
app.post("/users/:name", (req, res) => {
  res.status(201).json(usr.create(req.params.name));
});

//Add a request handler for the get method that will be used as a Read or Retrieve operation
app.get("/users/:id", (req, res) => {
  res.status(200).json(usr.read(req.params.id));
});

//Add a request handler for the put method that will be used as an Update operation
app.put("/users/:id=:name", (req, res) => {
  res.status(200).json(usr.update(req.params.id, req.params.name));
});

//Add a request handler for the delete method that will be used as a Delete operation
app.delete("/users/:id", (req, res) => {
  res.status(200).json(usr.delete(req.params.id));
});

app.listen(1337, () => console.log("Web Server running on port 1337"));
