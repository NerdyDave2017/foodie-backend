const mongoose = require("mongoose");

const DineInSchema = new mongoose.Schema(
  {
    restaurantCost: { type: Number, required: true },
    isDineActive: { type: Boolean, required: true },
    openDineTime: { type: String },
    closeDineTime: { type: String },
    isDineFulfiilled: { type: Boolean, required: true, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }, // references the _id field in the users collection for the user who added this dineIn
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
    }, // references the _id field in the users collection for the merchant who added this dineIn
  },
  {
    timestamps: true,
  }
);

const DineIn = mongoose.model("DineIn", DineInSchema);

module.exports = DineIn;
