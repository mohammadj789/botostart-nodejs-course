const { default: mongoose } = require("mongoose");
const featureSchema = new mongoose.Schema({
  default: {
    height: { type: Number, default: 0 },
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    color: { type: [String], default: [] },
    model: { type: [String], default: [] },
    madeIn: { type: String, default: "0" },
  },
});
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_desc: { type: String, required: true },
  total_desc: { type: String, required: true },
  image: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, required: true },
  comments: { type: [], default: [] },
  like: { type: [mongoose.Types.ObjectId], default: [] },
  dislike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, required: true },
  time: { type: String },
  format: { type: String },
  teacher: { type: mongoose.Types.ObjectId, required: true },
  feature: {
    type: featureSchema,
  },
});
const ProductModel = mongoose.model("product", productSchema);
module.exports = { ProductModel };
