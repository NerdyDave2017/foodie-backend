const DriverService = require("./driver.services");
const UserService = require("../user/user.services");
const UserNotFound = require("../../../exceptions/UserNotFound");
const InvalidCredentials = require("../../../exceptions/InvalidCredentials");
const HttpException = require("../../../exceptions/HttpExceptions");

class UserController {
  constructor() {
    this.driverService = new DriverService();
    this.userService = new UserService();
  }

  updateData = async (req, res, next) => {
    const { id } = req.body;
    try {
      const restaurant = await this.driverService.findDriverById(id);

      if (!restaurant) {
        throw next(new HttpException(404, "Driver not found"));
      }

      const updatedDriver = await this.driverService.findOneAndUpdate(req.body);
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

      const restaurants = await this.driverService.findUserRestaurants(id);
      return res.status(200).json({ restaurants });
    } catch (error) {}
  };

  fetchAllRestaurants = async (req, res) => {
    try {
      const { restaurants } = await this.driverService.fetchAllRestaurants();
      return res.status(200).json({ restaurants });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

module.exports = UserController;
