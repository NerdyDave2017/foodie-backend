const SpecialDiscountService = require("./discounts.services");
const RestaurantService = require("../users/restaurant/restaurant.services");
const HttpException = require("../../exceptions/HttpExceptions");
const generateDiscountCode = require("../../utils/generateShortCode");

class SpecialDiscountController {
  constructor() {
    this.specialDiscountService = new SpecialDiscountService();
    this.restaurantService = new RestaurantService();
  }

  createDiscount = async (req, res, next) => {
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
      const discountCode = generateDiscountCode();

      const newDiscount = await this.specialDiscountService.createDiscount({
        ...discount,
        code: discountCode,
      });
      return res.status(201).json({
        status: "success",
        message: "Discount created",
        newDiscount,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllDiscounts = async (req, res, next) => {
    try {
      const discounts = await this.specialDiscountService.getAllDiscounts();
      return res.status(200).json({
        status: "success",
        message: "All discounts",
        discounts,
      });
    } catch (error) {
      next(error);
    }
  };

  getDiscountById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const discountExist = await this.specialDiscountService.getDiscountById(
        id
      );

      if (!discountExist) {
        throw next(new HttpException(404, "Discount not found"));
      }

      const discount = await this.specialDiscountService.getDiscountById(id);
      return res.status(200).json({
        status: "success",
        message: "Discount found",
        discount,
      });
    } catch (error) {
      next(error);
    }
  };

  getRestaurantDiscounts = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const discounts =
        await this.specialDiscountService.getRestaurantDiscounts(restaurantId);
      return res.status(200).json({
        status: "success",
        message: "All Restaurant discounts",
        discounts,
      });
    } catch (error) {
      next(error);
    }
  };

  activateDiscount = async (req, res, next) => {
    try {
      const { id, restaurantId } = req.body;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const discountExist = await this.specialDiscountService.getDiscountById(
        id
      );

      if (!discountExist) {
        throw next(new HttpException(404, "Discount not found"));
      }

      const discount = await this.specialDiscountService.updateDiscountById(
        id,
        {
          active: true,
        }
      );
      return res.status(200).json({
        status: "success",
        message: "Discount activated",
        discount,
      });
    } catch (error) {
      next(error);
    }
  };

  deactivateDiscount = async (req, res, next) => {
    try {
      const { id, restaurantId } = req.body;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const discountExist = await this.specialDiscountService.getDiscountById(
        id
      );

      if (!discountExist) {
        throw next(new HttpException(404, "Discount not found"));
      }

      const discount = await this.specialDiscountService.updateDiscountById(
        id,
        {
          active: false,
        }
      );
      return res.status(200).json({
        status: "success",
        message: "Discount deactivated",
        discount,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteDiscount = async (req, res, next) => {
    try {
      const { id, restaurantId } = req.body;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const discountExist = await this.specialDiscountService.getDiscountById(
        id
      );

      if (!discountExist) {
        throw next(new HttpException(404, "Discount not found"));
      }

      const discount = await this.specialDiscountService.deleteDiscountById(id);
      return res.status(200).json({
        status: "success",
        message: "Discount deleted",
        discount,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SpecialDiscountController;
