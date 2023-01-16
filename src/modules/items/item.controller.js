const ItemService = require("./item.services");

class ItemController {
  itemService;
  constructor() {
    this.itemService = new ItemService();
  }

  createItem = async (req, res, next) => {
    try {
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
}

module.exports = ItemController;
