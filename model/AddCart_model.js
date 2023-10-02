const mongoose = require("mongoose");
const addCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: String,
      required: true,
      unique: true,
    },
  
    location: {
      type: String,
      required: true,
    },
    tel: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
  
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("addCart", addCartSchema);
