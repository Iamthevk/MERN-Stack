const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { connection, Schema } = mongoose;
dotenv.config();

//create a new connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(console.error);

// Define a schema
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
});

//Compile the schema into a model:
const User = mongoose.model("User1", UserSchema);

connection.once("connected", async () => {
  try {
    const user = await new User({
      firstName: "Deepak",
      lastName: "Das",
      age: 24,
    }).save();
    const findUser = await User.findOne()
      .where("firstName")
      .equals("Deepak")
      .where("age")
      .lte(24)
      .select("lastName age"); //use the select method to restrict which fields are retrieved from the document

    console.log(JSON.stringify(findUser, null, 4)); //{ "_id": "65c26f8b07f871909e50cdae","lastName": "Das","age": 24}
    await user.remove();
  } catch (error) {
    console.dir(error.message, { colors: true });
  } finally {
    await connection.close();
  }
});
