const Router = require("express").Router();
const OfferCouponController = require("../../modules/offerCoupon/offerCoupon.controller");

const offerCouponController = new OfferCouponController();

Router.post("/create", offerCouponController.createDiscount);
Router.get("/", offerCouponController.getAllDiscounts);
Router.get(
  "/restaurant/:restaurantId",
  offerCouponController.getRestaurantDiscounts
);
Router.patch("/activate", offerCouponController.activateDiscount);
Router.patch("/deactivate", offerCouponController.deactivateDiscount);
Router.delete("/delete", offerCouponController.deleteDiscount);
Router.get("/:id", offerCouponController.getDiscountById);

module.exports = Router;
