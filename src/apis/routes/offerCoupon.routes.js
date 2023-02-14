const Router = require("express").Router();
const OfferCouponController = require("../../modules/offerCoupon/offerCoupon.controller");

const offerCouponController = new OfferCouponController();

Router.post("/create", offerCouponController.createOffer);
Router.get("/", offerCouponController.getAllOffers);
Router.get(
  "/restaurant/:restaurantId",
  offerCouponController.getRestaurantOffers
);
Router.patch("/activate", offerCouponController.activateOffer);
Router.patch("/deactivate", offerCouponController.deactivateOffer);
Router.delete("/delete", offerCouponController.deleteOffer);
Router.get("/:id", offerCouponController.getOfferById);

module.exports = Router;
