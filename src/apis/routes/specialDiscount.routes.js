const Router = require("express").Router();
const SpecialDiscountController = require("../../modules/discounts/discounts.controller");

const specialDiscountController = new SpecialDiscountController();

Router.post("/create", specialDiscountController.createDiscount);
Router.get("/", specialDiscountController.getAllDiscounts);
Router.get("/:id", specialDiscountController.getDiscountById);
Router.get(
  "/discounts/:restaurantId",
  specialDiscountController.getRestaurantDiscounts
);
Router.patch("/activate", specialDiscountController.activateDiscount);
Router.patch("/deactivate", specialDiscountController.deactivateDiscount);
Router.delete("/delete", specialDiscountController.deleteDiscount);

module.exports = Router;
