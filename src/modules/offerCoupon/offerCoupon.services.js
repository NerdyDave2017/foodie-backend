const SpecialOffer = require("../../models/offerCoupon/offerCoupon.model");

class SpecialOfferService {
  specialOffer;
  constructor() {
    this.specialOffer = SpecialOffer;
  }

  createOffer = async (offer) => {
    try {
      const newOffer = await this.specialOffer.create(offer);
      return newOffer;
    } catch (err) {}
  };

  getAllOffers = async () => {
    try {
      const offers = await this.specialOffer.find({});
      return offers;
    } catch (error) {}
  };

  getOfferById = async (id) => {
    try {
      const offer = await this.specialOffer.findById(id);
      return offer;
    } catch (err) {}
  };

  getRestaurantOffers = async (id) => {
    try {
      const offers = await this.specialOffer.find({ restaurantId: id });
      return offers;
    } catch (err) {}
  };

  updateOfferById = async (id, offer) => {
    try {
      const updatedOffer = await this.specialOffer.findByIdAndUpdate(
        id,
        { ...offer },
        { new: true }
      );
      return updatedOffer;
    } catch (err) {}
  };

  deleteOfferById = async (id) => {
    try {
      const deletedOffer = await this.specialOffer.findByIdAndDelete(id);
      return deletedOffer;
    } catch (err) {}
  };
}

module.exports = SpecialOfferService;
