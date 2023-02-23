const mongoose = require("mongoose");
const SpecialDiscountSchema = new mongoose.Schema(
  {
    name: { type: String },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    details: { type: String, default: "" },
    discountType: {
      type: String,
      enum: {
        values: ["percentage", "fixed price"],
        message: "couponType must be either percentage or fixed price",
      },
      default: "",
    },
    active: { type: Boolean, default: true, default: false, required: true },
    discountValue: { type: Number, discount: null },
    startDate: { type: String, default: "", required: true },
    endDate: { type: String, default: "", required: true },
    expired: { type: Boolean, default: false, required: true },
    usabilityLimit: { type: Number, default: null, required: true },
    usageCount: { type: Number, default: 0, required: true },
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
