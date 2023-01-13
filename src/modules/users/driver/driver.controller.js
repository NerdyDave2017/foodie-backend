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

  login = async (req, res, next) => {
    const { userEmail, password } = req.body;
    try {
      const user = await this.userService.findUserByEmail(userEmail);
      if (!user) {
        throw next(new UserNotFound());
      }

      const isPasswordValid = await this.userService.comparePassword(password);
      if (!isPasswordValid) {
        throw next(new InvalidCredentials());
      }

      if (!user.driver) {
        const driver = await this.driverService.createDriver({
          owner: user._id,
        });
        /* Updating the role of the user to driver. */
        await this.userService.updateRole(user._id, "driver");
        /* Updating the user data with the driver id. */
        const user = await this.userService.updateData({
          driver: driver._id,
        });
        return res
          .status(200)
          .json({ status: "success", message: "New driver created", user });
      }

      return res
        .status(200)
        .json({ status: "success", message: "Driver login", user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

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
