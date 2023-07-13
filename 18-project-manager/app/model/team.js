const { Schema, model, default: mongoose } = require("mongoose");

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    username: { type: String, required: true, unique: true },
    owner: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);
const teamModel = model("Team", teamSchema);
module.exports = { teamModel };
