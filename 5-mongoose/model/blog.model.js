const { Schema, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      validate(value) {
        if (value.includes("hihihi")) {
          throw new Error("no hihihi");
        }
      },
    },
    text: { type: String, required: true, trim: true, minLength: 5 },
    show: { type: Boolean, default: false },
    like: { type: Number, default: 0 },
    bookmark: { type: [String], default: [] },
  },
  { timestamps: true }
);
const BlogModel = model("blog", BlogSchema);
module.exports = { BlogModel };
