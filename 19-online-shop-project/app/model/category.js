const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, default: undefined },
});
const CategoryModel = mongoose.model("category", categorySchema);
module.exports = { CategoryModel };
