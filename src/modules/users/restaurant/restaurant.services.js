class RestaurantService {
  constructor(RestaurantModel) {
    this.RestaurantModel = RestaurantModel;
  }

  async signUp(restaurantData) {
    try {
      const { email } = restaurantData;
      const { restaurantExist } = await RestaurantModel.findByEmail(email);

      if (restaurantExist) {
        throw new Error(`Restaurant Already Exists`);
      }

      const { restaurant } = await RestaurantModel.create(restaurantData);

      // Email verification dependency

      return { restaurant };
    } catch (error) {}
  }

  async signIn(restaurantData) {
    try {
      const { email, password } = restaurantData;
      const { restaurant } = await RestaurantModel.findByEmail(email);
      const validPassword = await RestaurantModel.matchPassword(password);

      if (restaurant && validPassword) {
        return { restaurant };
      } else {
        throw new Error(`Invalid credentials`);
      }
    } catch (error) {}
  }

  async updateData(restaurantData) {
    try {
      const { email, password, ...rest } = restaurantData;
      if (password) {
        throw new Error(`Password cannot be updated`);
      }

      const { restaurant } = await RestaurantModel.findByEmail(email);

      if (!restaurant) {
        throw new Error(`Restaurant does not exist`);
      }

      const { updatedRestaurant } = await RestaurantModel.update(email, {
        ...rest,
      });

      return { updatedRestaurant };
    } catch (error) {}
  }

  async updatePassword(restaurantData) {
    const { email, password, newPassword } = restaurantData;
    try {
      const { restaurant } = await RestaurantModel.findByEmail(email);

      if (!restaurant) {
        throw new Error(`Restaurant does not exist`);
      }

      const validPassword = await RestaurantModel.matchPassword(password);

      if (!validPassword) {
        throw new Error(`Invalid credentials`);
      }

      const { updatedRestaurant } = await RestaurantModel.update(email, {
        password: newPassword,
      });

      return { updatedRestaurant };
    } catch (error) {}
  }

  async fetchAllRestaurant() {
    const { restaurants } = await this.RestaurantModel.getAll();
    return { restaurants };
  }
}

module.exports = RestaurantService;
