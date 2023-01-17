const Restaurants = require("../../../models/users/restaurant/restaurant.model");

class RestaurantService {
  restaurants;
  constructor() {
    this.restaurants = Restaurants;
  }

  createRestaurant = async (restaurantData) => {
    try {
      const newRestaurant = new this.restaurants.create({
        ...restaurantData,
      });
      return { restaurant: newRestaurant };
    } catch (error) {}
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

  findUserRestaurants = async (userId) => {
    try {
      const restaurants = await this.restaurants.find({ user: userId });
      return restaurants;
    } catch (error) {}
  };

  fetchAllRestaurants = async () => {
    const { restaurants } = await this.restaurants.find({});
    return restaurants;
  };
}

module.exports = RestaurantService;
