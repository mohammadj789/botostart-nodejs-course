const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      default: undefined,
    },
  },

  {
    id: false,
    toJSON: { virtuals: true },
  }
);
categorySchema.virtual("children", {
  foreignField: "parent",
  localField: "_id",
  ref: "category",
});
categorySchema.pre("findOne", function (next) {
  this.populate({ path: "children", select: { __v: 0 } });
  next();
});
categorySchema.pre("find", function (next) {
  this.populate({ path: "children", select: { __v: 0 } });
  next();
});
const CategoryModel = mongoose.model("category", categorySchema);
module.exports = { CategoryModel };
