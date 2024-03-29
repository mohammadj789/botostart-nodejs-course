const { default: mongoose } = require("mongoose");
const { comentSchema } = require("./public.schema");
const featureSchema = new mongoose.Schema({
  height: { type: Number, default: 0 },
  length: { type: Number, default: 0 },
  width: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  color: { type: [String], default: [] },
  model: { type: [String], default: [] },
  madeIn: { type: String, default: "0" },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  short_text: { type: String, required: true },
  images: { type: [String], required: true },
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
  count: { type: Number },
  type: { type: String, required: true },

  format: { type: String },
  supplier: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  feature: {
    type: featureSchema,
  },
});
productSchema.index({
  text: "text",
  short_text: "text",
  title: "text",
});
const ProductModel = mongoose.model("product", productSchema);
module.exports = { ProductModel };
