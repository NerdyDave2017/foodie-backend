const ItemService = require("./item.services");
const RestaurantService = require("../users/restaurant/restaurant.services");
const HttpException = require("../../exceptions/HttpExceptions");

class ItemController {
  itemService;
  restaurantService;
  constructor() {
    this.itemService = new ItemService();
    this.restaurantService = new RestaurantService();
  }

  createItem = async (req, res, next) => {
    const { restaurant } = req.body;
    try {
      // Check if the restaurant exists
      const restaurantExists = await this.restaurantService.getRestaurantById(
        restaurant
      );

      if (!restaurantExists) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const item = await this.itemService.createItem(req.body);

      return res
        .status(201)
        .json({ status: "success", message: "Item created", item });
    } catch (err) {
      next(err);
    }
  };

  getAllItems = async (req, res, next) => {
    try {
      const items = await this.itemService.getAllItems();
      return res
        .status(200)
        .json({ status: "success", message: "All items", items });
    } catch (err) {
      next(err);
    }
  };

  getRestaurantItems = async (req, res, next) => {
    try {
      const items = await this.itemService.getRestaurantItems(req.params.id);
      return res
        .status(200)
        .json({ status: "success", message: "Restaurant items", items });
    } catch (err) {
      next(err);
    }
  };

  getItemById = async (req, res, next) => {
    try {
      const item = await this.itemService.getItemById(req.params.id);
      return res.status(200).json({ status: "success", message: "Item", item });
    } catch (err) {
      next(err);
    }
  };

  deleteItem = async (req, res, next) => {
    const { restaurant, itemId } = req.body;
    try {
      // Check if the restaurant exists
      const restaurantExists = await this.restaurantService.getRestaurantById(
        restaurant
      );

      if (!restaurantExists) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const item = await this.itemService.deleteItem(itemId);
      return res
        .status(200)
        .json({ status: "success", message: "Item deleted", item });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ItemController;
