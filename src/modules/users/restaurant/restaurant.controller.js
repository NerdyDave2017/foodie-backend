const RestaurantModel = require("../../../models/users/restaurant/restaurant.model");
const RestaurantService = require("./restaurant.controller");

class UserController {
  constructor() {
    this.restaurantService = new RestaurantService(RestaurantModel);
  }

  async create(req, res) {
    try {
      const { restaurant } = await this.restaurantService.create(req.body);
      return res.status(201).json({ restaurant });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async signIn(req, res) {
    try {
      const { restaurant } = await this.restaurantService.signIn(req.body);
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

  async fetcAllUsers(req, res) {
    try {
      const { restaurants } = await this.restaurantService.fetchAllUser();
      return res.status(200).json({ restaurants });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

module.exports = UserController;
