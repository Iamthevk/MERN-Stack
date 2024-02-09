//Models have built-in static methods such as find, findOne, and findById

//Schemas have a property called statics which is an object. All the methods defined inside the statics object are passed to the model.

const mongoose = require("mongoose");
const { connection, Schema } = mongoose;
mongoose.connect(process.env.MONGO).catch(console.error);

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  likes: [String],
});

UserSchema.static("getByFullName", function getByFullName(name) {
  const fullName = String(name).split(" ");
  const lastName = fullName[0] || "";
  const firstName = fullName[1] || "";
  return this.findOne()
    .where("firstName")
    .equals(firstName)
    .where("lastName")
    .equals(lastName);
});

// Compile the schema into a model
const User = mongoose.model("User002", UserSchema);

connection.once("connected", async () => {
  try {
    // Create
    const user = new User({
      firstName: "Ravi",
      lastName: "Kant",
      likes: ["mango", "strawberries"],
    });
    await user.save();
    // Read
    const person = await User.getByFullName("Kant Ravi");
    console.log(JSON.stringify(person, null, 4));
    await person.deleteOne();
    await connection.close();
  } catch (error) {
    console.log(error.message);
  }
});
