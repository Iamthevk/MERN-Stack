// Documents have their own built-in instance methods such as save and remove.
// However, we can write our own instance methods as well.

// Document instance methods are defined in the schema.
// All schemas have a method called method which allows you to define custom instance methods

const mongoose = require("mongoose");
const { connection, Schema } = mongoose;
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(console.error);

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  likes: [String],
});

//Define a document instance method for setting a user's first name and last name from a string containing their full name
UserSchema.method("setFullName", function setFullName(v) {
  const fullName = String(v).split(" ");
  this.lastName = fullName[0] || "";
  this.firstName = fullName[1] || "";
});

//Define an document instance method for getting a user's full name concatenating the firstName and lastName properties
UserSchema.method("getFullName", function getFullName() {
  return `${this.lastName} ${this.firstName}`;
});

//Define a document instance method named loves that will expect one argument that will add to the likes array of strings
UserSchema.method("loves", function loves(stuff) {
  this.likes.push(stuff);
});

//Define a document instance method named dislikes which will remove one thing previous liked by the user from the likes array
UserSchema.method("dislikes", function dislikes(stuff) {
  this.likes = this.likes.filter((str) => str !== stuff);
});

//Compile the schema into a model
const User = mongoose.model("User001", UserSchema);

connection.once("connected", async () => {
  try {
    // Create
    const user = new User();
    user.setFullName("Kumar Ajay");
    user.loves("dogs");
    user.loves("grapes");
    user.loves("snakes");
    await user.save();
    console.log(user);
    // Update
    const person = await User.findOne()
      .where("firstName", "Ajay")
      .where("likes")
      .in(["snakes", "dogs"]);
    person.dislikes("snakes");
    await person.save();
    // Display
    console.log(person.getFullName());
    console.log(JSON.stringify(person, null, 4));
    // Remove
    await user.deleteOne();
  } catch (error) {
    console.dir(error.message, { colors: true });
  } finally {
    await connection.close();
  }
});
