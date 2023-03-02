const Router = require("express").Router();
const RestaurantController = require("../../modules/users/restaurant/restaurant.controller");

const restaurantController = new RestaurantController();

Router.post("/create", restaurantController.create);
Router.patch("/update/:id", restaurantController.updateRestaurant);
Router.get("/", restaurantController.getAllRestaurants);
Router.get("/user/:userId", restaurantController.getUserRestaurants);
Router.get("/:id", restaurantController.getRestaurantById);

module.exports = Router;
