const mongoose = require("mongoose");
const SpecialOfferSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    imageUrl: { type: String, default: "" },
    couponType: {
      type: String,
      enum: {
        values: ["percentage", "fixed price"],
        message: "couponType must be either percentage or fixed price",
      },
    },
    active: { type: Boolean, default: true },
    couponValue: { type: Number, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    expired: { type: Boolean, default: false },
    usabilityLimit: { type: Number, default: 0 },
    usageCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const SpecialOffer = mongoose.model("SpecialOffer", SpecialOfferSchema);
module.exports = SpecialOffer;
