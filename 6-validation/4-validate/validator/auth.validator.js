const Schema = require("validate");

const registerSchema = new Schema({
  username: {
    type: String,
    required: true,
    length: { min: 4, max: 20 },
  },
  email: {
    type: String,
    required: true,
    length: { min: 11, max: 67 },
    match: /[a-z0-9]{4,50}\@[a-z]{3,10}\.[a-z]{2,6}/i,
    message: {
      type: "must be String",
      match: "worng format for email",
    },
  },

  role: {
    type: String,
    enum: ["admin", "user", "creator"],
    required: true,
  },
});

module.exports = { registerSchema };
