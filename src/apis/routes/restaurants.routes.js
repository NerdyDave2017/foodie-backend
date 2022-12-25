const RestaurantController = require("../../modules/users/restaurant/restaurant.controller");

const restaurantController = new RestaurantController();

const userRoutes = (app) => {
  app.post("/create", restaurantController.create);
  app.post("/signin", restaurantController.signIn);
  app.put("/update", restaurantController.updateData);
  app.put("/password", restaurantController.updatePassword);
  app.get("/", restaurantController.fetchAllUsers);
};

module.exports = userRoutes;
