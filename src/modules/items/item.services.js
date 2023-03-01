const Items = require("../../models/items/items.model");

class ItemService {
  items;
  constructor() {
    this.items = Items;
  }

  createItem = async (item) => {
    try {
      const newItem = await this.items.create(item);

      return newItem;
    } catch (err) {}
  };

  getAllItems = async () => {
    try {
      const items = await this.items.find({});
      return items;
    } catch (error) {}
  };

  getRestaurantItems = async (restaurantId) => {
    try {
      const items = await this.items.find({ restaurantId: restaurantId });
      return items;
    } catch (error) {}
  };

  getItemById = async (id) => {
    try {
      const item = await this.items.findById(id);
      return item;
    } catch (err) {}
  };

  updateItem = async (id, data) => {
    try {
      const item = await this.items.findByIdAndUpdate(
        id,
        { ...data },
        {
          new: true,
        }
      );
      return item;
    } catch (err) {}
  };

  deleteItem = async (id) => {
    try {
      const item = await this.items.findByIdAndDelete(id);
      return item;
    } catch (err) {}
  };
}

module.exports = ItemService;
