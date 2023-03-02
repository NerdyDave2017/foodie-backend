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

      const data = {
        id: restaurant._id,
        restaurantName: restaurant.restaurantName,
        restaurantPhone: restaurant.restaurantPhone,
        Decription: restaurant.Decription,
        userId: restaurant.userId,
        restaurantImage: restaurant.restaurantImage,
        categories: restaurant.categories,
        services: restaurant.services,
        openingHours: restaurant.openingHours,
        items: restaurant.items,
        restaurantAddress: restaurant.restaurantAddress,
        deliverySetting: restaurant.deliverySetting,
        delivery: restaurant.delivery,
      };

      return res
        .status(201)
        .json({ status: "success", message: "Restaurant created", data });
    } catch (error) {
      next(error);
    }
  };

  updateRestaurant = async (req, res, next) => {
    const { id } = req.params;
    const restaurantData = req.body;
    try {
      const restaurant = await this.restaurantService.findRestaurantById(id);

      if (!restaurant) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const updatedRestaurant = await this.restaurantService.findOneAndUpdate(
        id,
        restaurantData
      );

      const data = {
        id: updatedRestaurant._id,
        updatedRestaurantName: updatedRestaurant.restaurantName,
        updatedRestaurantPhone: updatedRestaurant.restaurantPhone,
        description: updatedRestaurant.description,
        userId: updatedRestaurant.userId,
        updatedRestaurantImage: updatedRestaurant.restaurantImage,
        categories: updatedRestaurant.categories,
        services: updatedRestaurant.services,
        openingHours: updatedRestaurant.openingHours,
        items: updatedRestaurant.items,
        updatedRestaurantAddress: updatedRestaurant.restaurantAddress,
        deliverySetting: updatedRestaurant.deliverySetting,
        delivery: updatedRestaurant.delivery,
      };

      return res.status(200).json({
        status: "success",
        message: "Restaurant updated",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getRestaurantById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const restaurant = await this.restaurantService.findRestaurantById(id);

      if (!restaurant) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const data = {
        id: restaurant._id,
        restaurantName: restaurant.restaurantName,
        restaurantPhone: restaurant.restaurantPhone,
        description: restaurant.description,
        userId: restaurant.userId,
        restaurantImage: restaurant.restaurantImage,
        categories: restaurant.categories,
        services: restaurant.services,
        openingHours: restaurant.openingHours,
        items: restaurant.items,
        restaurantAddress: restaurant.restaurantAddress,
        deliverySetting: restaurant.deliverySetting,
        delivery: restaurant.delivery,
      };

      return res.status(200).json({
        status: "success",
        message: "restaurant found",
        data,
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

      const datas = restaurants.map((restaurant) => {
        return {
          id: restaurant._id,
          restaurantName: restaurant.restaurantName,
          restaurantPhone: restaurant.restaurantPhone,
          description: restaurant.description,
          userId: restaurant.userId,
          restaurantImage: restaurant.restaurantImage,
          categories: restaurant.categories,
          services: restaurant.services,
          openingHours: restaurant.openingHours,
          items: restaurant.items,
          restaurantAddress: restaurant.restaurantAddress,
          deliverySetting: restaurant.deliverySetting,
          delivery: restaurant.delivery,
        };
      });

      return res.status(200).json({
        status: "success",
        message: "All user restaurants",
        datas,
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

  deleteRestaurant = async (req, res, next) => {
    const { id } = req.params;
    try {
      const restaurant = await this.restaurantService.findRestaurantById(id);

      if (!restaurant) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      await this.restaurantService.deleteRestaurant(id);

      return res.status(200).json({
        status: "success",
        message: "Restaurant deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = RestaurantController;
