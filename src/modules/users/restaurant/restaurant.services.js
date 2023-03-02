const Restaurants = require("../../../models/users/restaurant/restaurant.model");

class RestaurantService {
  restaurants;
  constructor() {
    this.restaurants = Restaurants;
  }

  createRestaurant = async (restaurantData) => {
    try {
      const restaurant = await this.restaurants.create({
        ...restaurantData,
      });
      return restaurant;
    } catch (error) {
      console.log(error, "error");
    }
  };

  findRestaurantById = async (id) => {
    try {
      const restaurant = await this.restaurants.findById(id);
      return restaurant;
    } catch (error) {}
  };

  findOneAndUpdate = async (id, restaurantData) => {
    try {
      const restaurant = await this.restaurants.findByIdAndUpdate(id, {
        restaurantData,
      });
      return restaurant;
    } catch (error) {}
  };

  updateItem = async (itemId, restaurantId) => {
    try {
      const restaurant = await this.restaurants.findOneAndUpdate(restaurantId, {
        $push: { items: itemId },
      });
      return restaurant;
    } catch (error) {}
  };

  findUserRestaurants = async (userId) => {
    try {
      const restaurants = await this.restaurants.find({ user: userId });
      return restaurants;
    } catch (error) {}
  };

  fetchAllRestaurants = async () => {
    try {
      const restaurants = await this.restaurants.find({});
      return restaurants;
    } catch (error) {}
  };

  deleteRestaurant = async (id) => {
    try {
      const restaurant = await this.restaurants.findByIdAndDelete(id);
      return restaurant;
    } catch (error) {}
  };
}

module.exports = RestaurantService;
