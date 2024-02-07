const mongoose = require("mongoose");
const { connection, Schema } = mongoose;
mongoose
  .connect(
    "mongodb+srv://vijay:1133013902@mern-shop.zawp4pw.mongodb.net/mern-shop?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(console.error);

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  likes: [String],
});

//Define a document instance method
UserSchema.method("setFullName", function setFullName(v) {
  const fullName = String(v).split(" ");
  this.lastName = fullName[0] || "";
  this.firstName = fullName[1] || "";
});
