const RestaurantController = require("../../modules/users/restaurant/restaurant.controller");

const restaurantController = new RestaurantController();

const userRoutes = (app) => {
  app.post("/create", restaurantController.create);
  app.patch("/update", restaurantController.updateData);
  app.get("/", restaurantController.fetchAllRestaurants);
};

module.exports = userRoutes;
