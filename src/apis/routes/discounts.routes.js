const Router = require("express").Router();
const SpecialDiscountController = require("../../modules/discounts/discounts.controller");

const specialDiscountController = new SpecialDiscountController();

Router.post("/create", specialDiscountController.createDiscount);
Router.get("/", specialDiscountController.getAllDiscounts);
Router.get(
  "/restaurant/:restaurantId",
  specialDiscountController.getRestaurantDiscounts
);
Router.patch("/activate", specialDiscountController.activateDiscount);
Router.patch("/deactivate", specialDiscountController.deactivateDiscount);
Router.delete("/delete", specialDiscountController.deleteDiscount);
Router.get("/:id", specialDiscountController.getDiscountById);

module.exports = Router;
