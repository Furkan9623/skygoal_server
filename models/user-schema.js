const mongoose = require("mongoose");
const validator = require("validator");
const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field required"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Email format are not correct"],
      required: [true, "email field required"],
    },
    password: {
      type: String,
      required: [true, "password field required"],
      minLength: 5,
    },
    imgUrl: {
      type: String,
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", user_schema);
module.exports = UserModel;
