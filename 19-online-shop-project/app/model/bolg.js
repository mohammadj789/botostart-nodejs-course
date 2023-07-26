const { default: mongoose } = require("mongoose");

const comentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: new Date().getTime() },
  parent: {
    type: mongoose.Types.ObjectId,
  },
});

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: {
      type: [mongoose.Types.ObjectId],
      ref: "category",
      required: true,
    },
    comments: { type: [comentSchema], default: [] },
    like: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
      default: [],
    },
    dislike: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
      default: [],
    },
    bookmark: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
      default: [],
    },
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);
blogSchema.virtual("user", {
  ref: "user",
  foreignField: "_id",
  localField: "author",
});
blogSchema.virtual("category-detail", {
  ref: "category",
  foreignField: "_id",
  localField: "category",
});
const BlogModel = mongoose.model("blog", blogSchema);
module.exports = { BlogModel };
