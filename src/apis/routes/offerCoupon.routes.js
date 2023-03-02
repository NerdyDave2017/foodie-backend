const Router = require("express").Router();
const OfferCouponController = require("../../modules/offerCoupon/offerCoupon.controller");

const offerCouponController = new OfferCouponController();

Router.post("/create", offerCouponController.createOffer);
Router.get("/", offerCouponController.getAllOffers);
Router.get(
  "/restaurant/:restaurantId",
  offerCouponController.getRestaurantOffers
);
Router.patch("/activate/:offerId", offerCouponController.activateOffer);
Router.patch("/deactivate/:offerId", offerCouponController.deactivateOffer);
Router.delete("/delete/:offerId", offerCouponController.deleteOffer);
Router.patch("/update/:offerId", offerCouponController.updateOffer);
Router.get("/:offerId", offerCouponController.getOfferById);

module.exports = Router;
