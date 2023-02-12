const SpecialDiscount = require("../../models/discounts/discounts.model");

class SpecialDiscountService {
  specialDiscount;
  constructor() {
    this.specialDiscount = SpecialDiscount;
  }

  createDiscount = async (discount) => {
    try {
      const newDiscount = await this.specialDiscount.create(discount);
      return newDiscount;
    } catch (err) {}
  };

  getAllDiscounts = async () => {
    try {
      const discounts = await this.specialDiscount.find({});
      return discounts;
    } catch (error) {}
  };

  getDiscountById = async (id) => {
    try {
      const discount = await this.specialDiscount.findById(id);
      return discount;
    } catch (err) {}
  };

  getRestaurantDiscounts = async (id) => {
    try {
      const discounts = await this.specialDiscount.find({ restaurantId: id });
      return discounts;
    } catch (err) {}
  };

  updateDiscountById = async (id, discount) => {
    try {
      const updatedDiscount = await this.specialDiscount.findByIdAndUpdate(
        id,
        discount,
        { new: true }
      );
      return updatedDiscount;
    } catch (err) {}
  };

  deleteDiscountById = async (id) => {
    try {
      const deletedDiscount = await this.specialDiscount.findByIdAndDelete(id);
      return deletedDiscount;
    } catch (err) {}
  };
}

module.exports = SpecialDiscountService;
