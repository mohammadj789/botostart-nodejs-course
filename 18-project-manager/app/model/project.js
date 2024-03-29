const { Schema, default: mongoose, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, default: "/default/default.png" },
    owner: { type: mongoose.Types.ObjectId, required: true },
    team: { type: mongoose.Types.ObjectId },
    private: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);
const projectModel = model("Project", projectSchema);
module.exports = { projectModel };
