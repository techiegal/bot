const mongoose = require("mongoose");
const groupschema = mongoose.Schema(
  {
    groups_or_channels_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const groupmodels = mongoose.model("groups_channels", groupschema);

module.exports = groupmodels;
