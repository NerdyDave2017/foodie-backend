const Router = require("express").Router();
const RestaurantController = require("../../modules/users/restaurant/restaurant.controller");

const restaurantController = new RestaurantController();

Router.post("/create", restaurantController.create);
Router.patch("/update", restaurantController.updateData);
Router.get("/", restaurantController.getAllRestaurants);
Router.get("/user/:userId", restaurantController.getUserRestaurants);
Router.get("/:id", restaurantController.getRestaurantById);

// Special discounts routes

module.exports = Router;
