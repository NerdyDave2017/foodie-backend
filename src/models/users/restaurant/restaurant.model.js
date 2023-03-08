const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, required: true, default: "" },
    restaurantPhone: { type: String, required: true, default: "" },
    description: { type: String, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // references the _id field in the user collection
    restaurantImage: { type: String, default: "" },
    categories: {
      type: String,
      enum: {
        values: [
          "Potes de Sorvetes",
          "Multon FR",
          "Wine Beer",
          "high carb",
          "wine Shop",
          "beauty",
          "veg Pizza",
          "hair spa",
          "Coffee",
          "Sushi",
          "Ramen",
          "Bar Food",
          "Japanese",
          "New Mexican",
          "Sandwiches",
          "Mediterranean",
        ],
        message: "{VALUE} is not supported",
      },
      default: "",
    },
    services: [{ type: String }],
    openingHours: {
      weekdays: {
        openingTime: { type: String },
        closingTime: { type: String },
      },
      weekends: {
        openingTime: { type: String },
        closingTime: { type: String },
      },
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        // references the _id field in the items collection
      },
    ],
    restaurantAddress: {
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      apartmentSuite: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      zipCode: { type: Number, default: null },
    },
    deliverySetting: { type: Boolean, default: false },
    delivery: {
      chargePerKm: { type: Number, default: null },
      minDeliveryCharge: { type: Number, default: null },
      minDeliveryChargeWithinKm: { type: Number, default: null },
    },
  },
  {
    timestamps: true,
  }
);

const Restaurants = mongoose.model("Restaurants", RestaurantSchema);

module.exports = Restaurants;
