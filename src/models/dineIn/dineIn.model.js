const mongoose = require("mongoose");

const DineInSchema = new mongoose.Schema(
  {
    restaurantCost: { type: Number, required: true, default: null },
    isDineActive: { type: Boolean, required: true, default: true },
    openDineTime: { type: String, default: "" },
    closeDineTime: { type: String, default: "" },
    isDineFulfiilled: { type: Boolean, required: true, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    }, // references the _id field in the users collection for the user who added this dineIn
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    }, // references the _id field in the users collection for the merchant who added this dineIn
  },
  {
    timestamps: true,
  }
);

const DineIn = mongoose.model("DineIn", DineInSchema);

module.exports = DineIn;
