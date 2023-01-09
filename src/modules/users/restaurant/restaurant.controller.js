const RestaurantService = require("./restaurant.services");
const UserService = require("../user/user.services");

class UserController {
  constructor() {
    this.restaurantService = new RestaurantService();
    this.userService = new UserService();
  }

  async create(req, res) {
    try {
      const restaurant = await this.restaurantService.createRestaurant(
        req.body
      );
      return res
        .status(201)
        .json({ status: "success", message: "Restaurant created", restaurant });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async signIn(req, res) {
    try {
      const user = this.userService.create(req.body);

      const restaurant = await this.restaurantService.signIn(req.body);
      return res.status(200).json({ restaurant });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async updateData(req, res) {
    try {
      const { updatedRestaurant } = await this.restaurantService.updateData(
        req.body
      );
      return res.status(200).json({ updatedRestaurant });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async updatePassword(req, res) {
    try {
      const { updatedRestaurant } = await this.restaurantService.updatePassword(
        req.body
      );
      return res.status(200).json({ updatedRestaurant });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async fetchAllUsers(req, res) {
    try {
      const { restaurants } = await this.restaurantService.fetchAllUser();
      return res.status(200).json({ restaurants });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

module.exports = UserController;
