const mongoose = require("mongoose");
const SpecialDiscountSchema = new mongoose.Schema(
  {
    name: { type: String },
    code: { type: String },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    active: { type: Boolean, default: true },
    discount: { type: Number },
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
