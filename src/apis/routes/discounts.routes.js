const Router = require("express").Router();
const DiscountController = require("../../modules/discounts/discounts.controller");

const discountController = new DiscountController();

Router.post("/create", discountController.createDiscount);
Router.get("/", discountController.getAllDiscounts);
Router.get(
  "/restaurant/:restaurantId",
  discountController.getRestaurantDiscounts
);
Router.patch("/activate", discountController.activateDiscount);
Router.patch("/deactivate", discountController.deactivateDiscount);
Router.delete("/delete", discountController.deleteDiscount);
Router.get("/:id", discountController.getDiscountById);

module.exports = Router;
