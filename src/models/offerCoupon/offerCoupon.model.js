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
    active: { type: Boolean, default: true },
    offer: { type: Number },
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
