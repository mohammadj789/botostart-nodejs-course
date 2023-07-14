const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, lowercase: true },
  phone: { type: String },
  email: { type: String, lowercase: true },
  password: { type: String },
  opt: { type: Object, default: { code: 0, expires: 0 } },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  birthday: { type: String },
});
const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
