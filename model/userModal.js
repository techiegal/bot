const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    group_or_channel_id: [],
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const usermodel = mongoose.model("user", userSchema);

module.exports = usermodel;
