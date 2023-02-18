const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    category: { type: String },
    price: { type: Number },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
    }, // references the _id field in the users collection for the merchant who added this item
    photo: { type: String },
    photos: { type: Array },
    status: { type: String, enum: ["active", "inactive"] },
    quantity: { type: Number },
    publish: { type: Boolean },
    calories: { type: Number },
    grams: { type: Number },
    proteins: { type: Number },
    fats: { type: Number },
    veg: { type: Boolean },
    nonVeg: { type: Boolean },
    disPrice: { type: String, default: "0" },
    takeaway: { type: Boolean },
    size: { type: Array },
    sizePrice: { type: Array },
    addOnsTitle: { type: Array },
    addOnsPrice: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.model("Items", ItemSchema);

module.exports = Items;
