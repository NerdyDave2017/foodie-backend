const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
    }, // references the _id field in the users collection for the merchant who added this item
    photo: { type: String, default: "" },
    photos: { type: Array, default: [{ type: String }] },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    quantity: { type: Number, required: true },
    publish: { type: Boolean, default: false },
    calories: { type: Number, default: 0 },
    grams: { type: Number, default: 0 },
    proteins: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    veg: { type: Boolean, default: true },
    nonVeg: { type: Boolean, default: false },
    discountPrice: { type: Number, default: 0 },
    takeaway: { type: Boolean, default: true },
    sizes: { type: Array, default: [] },
    sizePrices: { type: Array, default: [] },
    addOnsTitles: { type: Array, default: [] },
    addOnsPrices: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.model("Items", ItemSchema);

module.exports = Items;
