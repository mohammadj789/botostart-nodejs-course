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
    ref: "comment",
  },
});
module.exports = { comentSchema };
