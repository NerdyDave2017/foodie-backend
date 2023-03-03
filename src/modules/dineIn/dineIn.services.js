const DineIn = require("../../models/dineIn/dineIn.model");

class DineInService {
  dineIn;
  constructor() {
    this.dineIn = DineIn;
  }

  createDineIn = async (dineIn) => {
    try {
      const newDineIn = await this.dineIn.create(dineIn);

      return newDineIn;
    } catch (err) {
      console.log(err);
    }
  };

  getAllDineIn = async () => {
    try {
      const dineIn = await this.dineIn.find({});
      return dineIn;
    } catch (error) {}
  };

  getRestaurantDineIn = async (restaurantId) => {
    try {
      const dineIn = await this.dineIn.find({ restaurantId: restaurantId });
      return dineIn;
    } catch (error) {}
  };

  getUserDineIn = async (userId) => {
    try {
      const dineIn = await this.dineIn.find({ userId: userId });
      return dineIn;
    } catch (error) {}
  };

  getDineInById = async (id) => {
    try {
      const item = await this.dineIn.findById(id);
      return item;
    } catch (err) {}
  };

  deleteDineIn = async (id) => {
    try {
      const item = await this.dineIn.findByIdAndDelete(id);
      return item;
    } catch (err) {}
  };
}

module.exports = DineInService;
