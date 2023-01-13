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
      return res.status(200).json({
        status: "success",
        message: "Driver updated",
        updatedDriver,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  fetchAllDrivers = async (req, res) => {
    try {
      const { restaurants } = await this.driverService.fetchAllRestaurants();
      return res.status(200).json({ restaurants });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

module.exports = UserController;
