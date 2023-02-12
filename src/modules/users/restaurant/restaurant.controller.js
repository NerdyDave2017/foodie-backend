const RestaurantService = require("./restaurant.services");
const UserService = require("../user/user.services");
const UserNotFound = require("../../../exceptions/UserNotFound");
const InvalidCredentials = require("../../../exceptions/InvalidCredentials");
const HttpException = require("../../../exceptions/HttpExceptions");

class RestaurantController {
  constructor() {
    this.restaurantService = new RestaurantService();
    this.userService = new UserService();
  }

  create = async (req, res, next) => {
    const { userEmail, ...rest } = req.body;
    try {
      const user = await this.userService.findUserByEmail(userEmail);
      if (!user) {
        throw next(new UserNotFound());
      }

      const restaurant = await this.restaurantService.createRestaurant({
        user: user._id,
        ...rest,
      });

      // update user role & add restaurant id to user
      await this.userService.updateRestaurants(user._id, restaurant._id);
      await this.userService.updateRole(user._id, "restaurant");

      return res
        .status(201)
        .json({ status: "success", message: "Restaurant created", restaurant });
    } catch (error) {
      next(error);
    }
  };

  updateData = async (req, res, next) => {
    const { id, ...rest } = req.body;
    try {
      const restaurant = await this.restaurantService.findRestaurantById(id);

      if (!restaurant) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const updatedRestaurant = await this.restaurantService.findOneAndUpdate(
        id,
        { ...rest }
      );
      return res.status(200).json({
        status: "success",
        message: "Restaurant updated",
        updatedRestaurant,
      });
    } catch (error) {
      next(error);
    }
  };

  getRestaurantById = async (req, res, next) => {
    try {
      const { id } = req.body;

      const restaurant = await this.restaurantService.findRestaurantById(id);

      if (!restaurant) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      return res.status(200).json({
        status: "success",
        message: "restaurant found",
        restaurant,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserRestaurants = async (req, res, next) => {
    const { userId } = req.params;

    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw next(new UserNotFound());
      }

      const restaurants = await this.restaurantService.findUserRestaurants(
        userId
      );
      return res.status(200).json({
        status: "success",
        message: "All user restaurants",
        restaurants,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllRestaurants = async (req, res, next) => {
    try {
      const restaurants = await this.restaurantService.fetchAllRestaurants();
      return res.status(200).json({
        status: "success",
        message: "All restaurants",
        restaurants,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = RestaurantController;
