const Router = require("express").Router();
const RestaurantController = require("../../modules/users/restaurant/restaurant.controller");
const SpecialDiscountController = require("../../modules/discounts/discounts.controller");

const restaurantController = new RestaurantController();
const specialDiscountController = new SpecialDiscountController();

Router.post("/create", restaurantController.create);
Router.patch("/update", restaurantController.updateData);
Router.get("/", restaurantController.getAllRestaurants);
Router.get("/user/:userId", restaurantController.getUserRestaurants);
Router.get("/:id", restaurantController.getRestaurantById);

// Special discounts routes

Router.post("/discount/create", specialDiscountController.createDiscount);
Router.get("/discounts", specialDiscountController.getAllDiscounts);
Router.get("/discount/:id", specialDiscountController.getDiscountById);
Router.get(
  "/discounts/:restaurantId",
  specialDiscountController.getRestaurantDiscounts
);
Router.patch("/discount/activate", specialDiscountController.activateDiscount);
Router.patch(
  "/discount/deactivate",
  specialDiscountController.deactivateDiscount
);
Router.delete("/discount/delete", specialDiscountController.deleteDiscount);

module.exports = Router;
