const SpecialOfferService = require("./offerCoupon.services");
const RestaurantService = require("../users/restaurant/restaurant.services");
const HttpException = require("../../exceptions/HttpExceptions");
const generateOfferCode = require("../../utils/generateShortCode");

/**@todo Coupon validation prevent user from updating usage count in validation check*/

class SpecialOfferController {
  constructor() {
    this.specialOfferService = new SpecialOfferService();
    this.restaurantService = new RestaurantService();
  }

  createOffer = async (req, res, next) => {
    try {
      const { restaurantId } = req.body;
      const offer = req.body;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      //Generate offer code
      const offerCode = generateOfferCode();

      const newOffer = await this.specialOfferService.createOffer({
        ...offer,
        code: offerCode,
      });

      const data = {
        id: newOffer._id,
        code: newOffer.code,
        restaurantId: newOffer.restaurantId,
        name: newOffer.name,
        imageUrl: newOffer.imageUrl,
        couponType: newOffer.couponType,
        active: newOffer.active,
        couponValue: newOffer.couponValue,
        startDate: newOffer.startDate,
        endDate: newOffer.endDate,
        expired: newOffer.expired,
        usabilityLimit: newOffer.usabilityLimit,
        usageCount: newOffer.usageCount,
      };

      return res.status(201).json({
        status: "success",
        message: "Offer created",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllOffers = async (req, res, next) => {
    try {
      const offers = await this.specialOfferService.getAllOffers();

      const datas = offers.map((offer) => {
        return {
          id: offer._id,
          code: offer.code,
          restaurantId: offer.restaurantId,
          name: offer.name,
          imageUrl: offer.imageUrl,
          couponType: offer.couponType,
          active: offer.active,
          couponValue: offer.couponValue,
          startDate: offer.startDate,
          endDate: offer.endDate,
          expired: offer.expired,
          usabilityLimit: offer.usabilityLimit,
          usageCount: offer.usageCount,
        };
      });

      return res.status(200).json({
        status: "success",
        message: "All offers",
        datas,
      });
    } catch (error) {
      next(error);
    }
  };

  getOfferById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const offerExist = await this.specialOfferService.getOfferById(id);

      if (!offerExist) {
        throw next(new HttpException(404, "Offer not found"));
      }

      const offer = await this.specialOfferService.getOfferById(id);

      const data = {
        id: newOffer._id,
        code: newOffer.code,
        restaurantId: newOffer.restaurantId,
        name: newOffer.name,
        imageUrl: newOffer.imageUrl,
        couponType: newOffer.couponType,
        active: newOffer.active,
        couponValue: newOffer.couponValue,
        startDate: newOffer.startDate,
        endDate: newOffer.endDate,
        expired: newOffer.expired,
        usabilityLimit: newOffer.usabilityLimit,
        usageCount: newOffer.usageCount,
      };

      return res.status(200).json({
        status: "success",
        message: "Offer found",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getRestaurantOffers = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const offers = await this.specialOfferService.getRestaurantOffers(
        restaurantId
      );

      const datas = offers.map((offer) => {
        return {
          id: offer._id,
          code: offer.code,
          restaurantId: offer.restaurantId,
          name: offer.name,
          imageUrl: offer.imageUrl,
          couponType: offer.couponType,
          active: offer.active,
          couponValue: offer.couponValue,
          startDate: offer.startDate,
          endDate: offer.endDate,
          expired: offer.expired,
          usabilityLimit: offer.usabilityLimit,
          usageCount: offer.usageCount,
        };
      });

      return res.status(200).json({
        status: "success",
        message: "All Restaurant offers",
        datas,
      });
    } catch (error) {
      next(error);
    }
  };

  activateOffer = async (req, res, next) => {
    try {
      const { id, restaurantId } = req.body;

      const restaurantExist = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const offerExist = await this.specialOfferService.getOfferById(id);

      if (!offerExist) {
        throw next(new HttpException(404, "Offer not found"));
      }

      const offer = await this.specialOfferService.updateOfferById(id, {
        active: true,
      });

      const data = {
        id: newOffer._id,
        code: newOffer.code,
        restaurantId: newOffer.restaurantId,
        name: newOffer.name,
        imageUrl: newOffer.imageUrl,
        couponType: newOffer.couponType,
        active: newOffer.active,
        couponValue: newOffer.couponValue,
        startDate: newOffer.startDate,
        endDate: newOffer.endDate,
        expired: newOffer.expired,
        usabilityLimit: newOffer.usabilityLimit,
        usageCount: newOffer.usageCount,
      };

      return res.status(200).json({
        status: "success",
        message: "Offer activated",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deactivateOffer = async (req, res, next) => {
    try {
      const { offerId } = req.params;

      const offerExist = await this.specialOfferService.getOfferById(id);

      if (!offerExist) {
        throw next(new HttpException(404, "Offer not found"));
      }

      return res.status(200).json({
        status: "success",
        message: "Offer deactivated",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOffer = async (req, res, next) => {
    try {
      const { offerId } = req.params;

      const offerExist = await this.specialOfferService.getOfferById(offerId);

      if (!offerExist) {
        throw next(new HttpException(404, "Offer not found"));
      }

      await this.specialOfferService.deleteOfferById(offerId);
      return res.status(200).json({
        status: "success",
        message: "Offer deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SpecialOfferController;
