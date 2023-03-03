const Router = require("express").Router();
const DiscountController = require("../../modules/discounts/discounts.controller");

const discountController = new DiscountController();

Router.post("/create", discountController.createDiscount);
Router.get("/", discountController.getAllDiscounts);
Router.get(
  "/restaurant/:restaurantId",
  discountController.getRestaurantDiscounts
);
Router.patch("/update/:discountId", discountController.updateDiscount);
Router.patch("/activate/:discountId", discountController.activateDiscount);
Router.patch("/deactivate/:discountId", discountController.deactivateDiscount);
Router.delete("/delete/:discountId", discountController.deleteDiscount);
Router.get("/:discountId", discountController.getDiscountById);

module.exports = Router;
