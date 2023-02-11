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
    active: { type: Boolean },
    discount: { type: Number },
    minOrder: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    expired: { type: Boolean },
    usabilityLimit: { type: Number },
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
