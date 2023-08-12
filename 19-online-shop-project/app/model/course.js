const { default: mongoose } = require("mongoose");
const { comentSchema } = require("./public.schema");
const episode = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});
const chapter = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episodes: { type: [episode], default: "" },
});
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  short_text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    required: true,
  },
  comments: { type: [comentSchema], default: [] },
  like: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
  dislike: {
    type: [mongoose.Types.ObjectId],
    ref: "user",
    default: [],
  },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  type: { type: String, default: "free", required: true },
  status: { type: String, default: "not started" },
  time: { type: String, default: "00:00:00" },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  chapter: {
    type: [chapter],
    default: [],
  },
  students: {
    type: [mongoose.Types.ObjectId],
    ref: "user",
    default: [],
  },
});
courseSchema.index({
  title: "text",
  text: "text",
  short_text: "text",
});
const CourseModel = mongoose.model("course", courseSchema);
module.exports = { CourseModel };
