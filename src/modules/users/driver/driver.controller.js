const DriverService = require("./driver.services");
const UserService = require("../user/user.services");
const UserNotFound = require("../../../exceptions/UserNotFound");
const InvalidCredentials = require("../../../exceptions/InvalidCredentials");
const HttpException = require("../../../exceptions/HttpExceptions");

class UserController {
  constructor() {
    this.restaurantService = new RestaurantService();
    this.userService = new UserService();
  }

  updateData = async (req, res, next) => {
    const { id } = req.body;
    try {
      const restaurant = await this.restaurantService.findRestaurantById(id);

      if (!restaurant) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const { updatedRestaurant } = await this.restaurantService.updateData(
        req.body
      );
      return res.status(200).json({ updatedRestaurant });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  getUserRestaurants = async (req, res, next) => {
    const { id } = req.body;
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw next(new UserNotFound());
      }

      const restaurants = await this.restaurantService.findUserRestaurants(id);
      return res.status(200).json({ restaurants });
    } catch (error) {}
  };

  fetchAllRestaurants = async (req, res) => {
    try {
      const { restaurants } =
        await this.restaurantService.fetchAllRestaurants();
      return res.status(200).json({ restaurants });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

module.exports = UserController;
