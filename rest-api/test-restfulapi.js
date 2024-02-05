const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");

const r = async (url, method) => {
  const response = await fetch(`http://localhost:1337${url}`, { method });
  const responseBody = await response; // Use text() instead of json()
  console.log(`Raw Response for ${url}:`, responseBody);
  return responseBody; // Attempt to parse as JSON
};

const log = (...obj) => obj.forEach((o) => console.dir(o, { colors: true }));

async function test() {
  try {
    const users = await r("/users/all", "get");
    const { id } = users[3] || { id: uuid(), name: "Bob" };
    const getById = await r(`/users/${id}`, "get");
    const updateById = await r(`/users/${id}=John`, "put");
    const deleteById = await r(`/users/${id}`, "delete");
    // const addUsr = await r(`/users/Smith`, "post");
    const getAll = await r("/users/all", "get");

    log("[GET] users:", users);
    log(`[GET] a user with id="${id}":`, getById);
    log(`[PUT] a user with id="${id}":`, updateById);
    // log(`[POST] a new user:`, addUsr);
    log(`[DELETE] a user with id="${id}":`, deleteById);
    log(`[GET] users:`, getAll);
  } catch (error) {
    console.error("Error during test:", error);
  }
}
test();

// r(`/users/Smith`, "post");
// r(`/users/875f7e87-8f36-4002-8983-551478f24b50`, "delete");
// const users = await r("/users/all", "get");
const userId = "33e1183a-4be3-4bc0-9502-cd68cd5f1198";
const newName = "VK";
r(`/users/${userId}/${newName}`, "put");
// log("[GET] users:", users);
