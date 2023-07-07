const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

module.exports = userModel;
