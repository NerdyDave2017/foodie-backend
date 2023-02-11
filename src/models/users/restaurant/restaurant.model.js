const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema(
  {
    restaurantName: { type: String },
    restaurantPhone: { type: String },
    Decription: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // references the _id field in the user collection
    restaurantImage: { type: String },
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
          "Mediterrenean",
        ],
        message: "{VALUE} is not supported",
      },
    },
    services: [{ type: String }],
    openingHours: {
      monday: {
        open: { type: Boolean },
        startTime: { type: String },
        endTime: { type: String },
      },
      tuesday: {
        open: { type: Boolean },
        startTime: { type: String },
        endTime: { type: String },
      },
      wednesday: {
        open: { type: Boolean },
        startTime: { type: String },
        endTime: { type: String },
      },
      thursday: {
        open: { type: Boolean },
        startTime: { type: String },
        endTime: { type: String },
      },
      friday: {
        open: { type: Boolean },
        startTime: { type: String },
        endTime: { type: String },
      },
      saturday: {
        open: { type: Boolean },
        startTime: { type: String },
        endTime: { type: String },
      },
      sunday: {
        open: { type: Boolean },
        startTime: { type: String },
        endTime: { type: String },
      },
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        // references the _id field in the items collection
      },
    ],
    specialDiscount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SpecialDiscount",
        // references the _id field in the specialDiscount collection
      },
    ],
    restaurantAddress: {
      address: { type: String },
      city: { type: String },
      apartmentSuite: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: Number },
    },
    deliverySetting: { type: Boolean },
    delivery: {
      chargePerKm: { type: Number },
      minDeliveryCharge: { type: Number },
      minDeliveryChargeWithinKm: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Restaurants = mongoose.model("Restaurants", RestaurantSchema);
module.exports = Restaurants;
