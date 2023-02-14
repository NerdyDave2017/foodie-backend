const mongoose = require("mongoose");
const SpecialOfferSchema = new mongoose.Schema(
  {
    name: { type: String },
    code: { type: String },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    imageUrl: { type: String },
    couponType: {
      type: String,
      enum: {
        values: ["percentage", "fixed price"],
        message: "couponType must be either percentage or fixed price",
      },
    },
    active: { type: Boolean, default: true },
    couponValue: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    expired: { type: Boolean, default: false },
    usabilityLimit: { type: Number },
    usageCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const SpecialOffer = mongoose.model("SpecialOffer", SpecialOfferSchema);
module.exports = SpecialOffer;
