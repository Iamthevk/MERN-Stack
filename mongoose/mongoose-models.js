const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Schema, connection } = mongoose;

dotenv.config();
// create a connection to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(console.error);

//Define a schema
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  likes: [String],
});

//Compile the schema into a model
const User = mongoose.model("User", UserSchema);

// for adding new users
const addUser = (firstName, lastName) =>
  new User({
    firstName,
    lastName,
  }).save();

// retrieving a user from the collection of users by its id
const getUser = (id) => User.findById(id);

//remove the user from the collection of users by its id
const removeUser = (id) => User.deleteOne({ id });

connection.once("connected", async () => {
  try {
    //create
    const newUser = await addUser("Vijay", "Kumar");
    //read
    const user = await getUser(newUser.id);
    //update
    user.firstName = "Kumar";
    user.lastName = "Vijay";
    user.likes = ["reading books", "coding", "music"];
    await user.save();
    console.log(JSON.stringify(user, null, 4));
    // delete
    await removeUser(user.id);
  } catch (error) {
    console.dir(error.message, { colors: true });
  } finally {
    await connection.close();
  }
});
