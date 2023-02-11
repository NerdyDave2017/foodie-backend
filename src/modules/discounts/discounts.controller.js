const SpecialDiscountService = require("./discounts.services");
const RestaurantService = require("../users/restaurant/restaurant.services");
const HttpException = require("../../exceptions/HttpExceptions");

class SpecialDiscountController {
  constructor() {
    this.specialDiscountService = new SpecialDiscountService();
    this.restaurantService = new RestaurantService();
  }

  async createDiscount(req, res, next) {}

  async getDiscounts(req, res, next) {}

  async getDiscountById(req, res, next) {}

  async getRestaurantDiscounts(req, res, next) {}

  async deleteDiscount(req, res, next) {}

  async updateDiscount(req, res, next) {}
}
