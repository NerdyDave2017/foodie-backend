import Items from "../../models/items/items.model";

class ItemService {
  items;
  constructor() {
    this.items = Items;
  }

  createItem = async (item) => {
    try {
      const newItem = await this.items.create({ ...item });
      return newItem;
    } catch (err) {}
  };

  getItems = async () => {
    try {
      const items = await this.items.find({});
      return items;
    } catch (error) {}
  };

  getItemById = async (id) => {
    try {
      const item = await this.items.findById(id);
      return item;
    } catch (err) {}
  };
}

module.exports = ItemService;
