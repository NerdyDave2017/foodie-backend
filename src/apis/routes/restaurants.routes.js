const Router = require("express").Router();
const RestaurantController = require("../../modules/users/restaurant/restaurant.controller");

const restaurantController = new RestaurantController();

Router.post("/create", restaurantController.create);
Router.patch("/update", restaurantController.updateData);
Router.get("/", restaurantController.getAllRestaurants);

module.exports = Router;
