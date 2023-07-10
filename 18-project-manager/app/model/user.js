const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    rols: { type: [String], default: ["USER"] },
    email: { type: String, required: true, unique: true },
    profile_image: { type: String },
    password: { type: String, required: true },
    skils: { type: [String], default: [] },
    team: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: "" },
  },
  { timestamps: true }
);
const userModel = model("User", userSchema);
module.exports = { userModel };
