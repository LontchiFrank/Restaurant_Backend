const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Food", foodSchema);
