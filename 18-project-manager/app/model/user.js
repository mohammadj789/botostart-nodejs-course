const { Schema, model, default: mongoose } = require("mongoose");

const inviteRequestSchema = new Schema({
  teamId: { type: mongoose.Types.ObjectId, required: true },
  caller: { type: String, required: true, lowercase: true },
  dateRequest: { type: Date, default: new Date() },
  status: { type: String, default: "pending" },
});
const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    mobile: { type: String, required: true, unique: true },
    rols: { type: [String], default: ["USER"] },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    profile_image: { type: String },
    password: { type: String, required: true },
    skils: { type: [String], default: [] },
    team: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: "" },
    inviteRequests: { type: [inviteRequestSchema] },
  },
  { timestamps: true }
);
const userModel = model("User", userSchema);
module.exports = { userModel };
