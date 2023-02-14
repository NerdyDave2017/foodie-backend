const mongoose = require("mongoose");
const SpecialDiscountSchema = new mongoose.Schema(
  {
    name: { type: String },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    details: { type: String },
    discountType: {
      type: String,
      enum: {
        values: ["percentage", "fixed price"],
        message: "couponType must be either percentage or fixed price",
      },
    },
    active: { type: Boolean, default: true },
    discountValue: { type: Number },
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

const SpecialDiscount = mongoose.model(
  "SpecialDiscount",
  SpecialDiscountSchema
);
module.exports = SpecialDiscount;
