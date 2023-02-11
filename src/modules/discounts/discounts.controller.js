const SpecialDiscountService = require("./discounts.services");
const RestaurantService = require("../users/restaurant/restaurant.services");
const HttpException = require("../../exceptions/HttpExceptions");

class SpecialDiscountController {
  constructor() {
    this.specialDiscountService = new SpecialDiscountService();
    this.restaurantService = new RestaurantService();
  }

  async createDiscount(req, res, next) {
    try {
      const { restaurantId } = req.body;
      const discount = req.body;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      //Generate discount code

      const newDiscount = await this.specialDiscountService.createDiscount(
        discount
      );
      res.status(201).json({
        status: "success",
        message: "Discount created",
        newDiscount,
      });
    } catch (error) {
      next(error);
    }
  }

  async getDiscounts(req, res, next) {}

  async getDiscountById(req, res, next) {}

  async getRestaurantDiscounts(req, res, next) {}

  async deleteDiscount(req, res, next) {}

  async updateDiscount(req, res, next) {}
}
