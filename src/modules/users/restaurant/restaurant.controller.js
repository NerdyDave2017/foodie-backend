const RestaurantService = require("./restaurant.services");
const UserService = require("../user/user.services");
const UserNotFound = require("../../../exceptions/UserNotFound");
const InvalidCredentials = require("../../../exceptions/InvalidCredentials");
const HttpException = require("../../../exceptions/HttpExceptions");

class UserController {
  constructor() {
    this.restaurantService = new RestaurantService();
    this.userService = new UserService();
  }

  async create(req, res, next) {
    const { userEmail, ...rest } = req.body;
    try {
      const user = await this.userService.findUserByEmail(userEmail);
      if (!user) {
        throw next(new UserNotFound());
      }

      const restaurant = await this.restaurantService.createRestaurant({
        owner: user._id,
        ...rest,
      });
      return res
        .status(201)
        .json({ status: "success", message: "Restaurant created", restaurant });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async updateData(req, res) {
    const { id } = req.body;
    try {
      const restaurant = await this.restaurantService.findRestaurantById(id);

      if (!restaurant) {
        throw new HttpException(404, "Restaurant not found");
      }

      const { updatedRestaurant } = await this.restaurantService.updateData(
        req.body
      );
      return res.status(200).json({ updatedRestaurant });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async fetchAllRestaurants(req, res) {
    try {
      const { restaurants } =
        await this.restaurantService.fetchAllRestaurants();
      return res.status(200).json({ restaurants });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

module.exports = UserController;
