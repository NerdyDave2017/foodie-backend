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

      return res.status(201).json({
        status: "success",
        message: "Offer created",
        newOffer,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllOffers = async (req, res, next) => {
    try {
      const offers = await this.specialOfferService.getAllOffers();
      return res.status(200).json({
        status: "success",
        message: "All offers",
        offers,
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
      return res.status(200).json({
        status: "success",
        message: "Offer found",
        offer,
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
      return res.status(200).json({
        status: "success",
        message: "All Restaurant offers",
        offers,
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
      return res.status(200).json({
        status: "success",
        message: "Offer activated",
        offer,
      });
    } catch (error) {
      next(error);
    }
  };

  deactivateOffer = async (req, res, next) => {
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
        active: false,
      });
      return res.status(200).json({
        status: "success",
        message: "Offer deactivated",
        offer,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOffer = async (req, res, next) => {
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

      const offer = await this.specialOfferService.deleteOfferById(id);
      return res.status(200).json({
        status: "success",
        message: "Offer deleted",
        offer,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SpecialOfferController;
