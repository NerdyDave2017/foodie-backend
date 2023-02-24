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
    const { restaurantId } = req.body;
    try {
      // Check if the restaurant exists
      const restaurantExists = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExists) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const item = await this.itemService.createItem(req.body);

      //Add itemId to restaurant model
      await this.restaurantService.updateItem(item._id, restaurantId);

      const data = {
        id: item._id,
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        restaurantId: restaurantId,
        photo: item.photo,
        photos: item.photos,
        status: item.status,
        quantity: item.quantity,
        publish: item.publish,
        calories: item.calories,
        grams: item.grams,
        proteins: item.proteins,
        fats: item.fats,
        veg: item.veg,
        nonVeg: item.nonVeg,
        discountPrice: item.discountPrice,
        takeaway: item.takeaway,
        sizes: item.sizes,
        sizePrices: item.sizePrices,
        addOnsTitles: item.addOnsTitles,
        addOnsPrices: item.addOnsPrices,
      };

      return res
        .status(201)
        .json({ status: "success", message: "Item created", data });
    } catch (err) {
      next(err);
    }
  };

  getAllItems = async (req, res, next) => {
    try {
      const items = await this.itemService.getAllItems();

      const datas = items.map((item) => {
        return {
          id: item._id,
          name: item.name,
          description: item.description,
          category: item.category,
          price: item.price,
          restaurantId: item.restaurantId,
          photo: item.photo,
          photos: item.photos,
          status: item.status,
          quantity: item.quantity,
          publish: item.publish,
          calories: item.calories,
          grams: item.grams,
          proteins: item.proteins,
          fats: item.fats,
          veg: item.veg,
          nonVeg: item.nonVeg,
          discountPrice: item.discountPrice,
          takeaway: item.takeaway,
          sizes: item.sizes,
          sizePrices: item.sizePrices,
          addOnsTitles: item.addOnsTitles,
          addOnsPrices: item.addOnsPrices,
        };
      });

      return res
        .status(200)
        .json({ status: "success", message: "All items", datas });
    } catch (err) {
      next(err);
    }
  };

  getRestaurantItems = async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    try {
      // Check if the restaurant exists
      const restaurantExists = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExists) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const items = await this.itemService.getRestaurantItems(
        req.params.restaurantId
      );

      const datas = items.map((item) => {
        return {
          id: item._id,
          name: item.name,
          description: item.description,
          category: item.category,
          price: item.price,
          restaurantId: restaurantId,
          photo: item.photo,
          photos: item.photos,
          status: item.status,
          quantity: item.quantity,
          publish: item.publish,
          calories: item.calories,
          grams: item.grams,
          proteins: item.proteins,
          fats: item.fats,
          veg: item.veg,
          nonVeg: item.nonVeg,
          discountPrice: item.discountPrice,
          takeaway: item.takeaway,
          sizes: item.sizes,
          sizePrices: item.sizePrices,
          addOnsTitles: item.addOnsTitles,
          addOnsPrices: item.addOnsPrices,
        };
      });

      return res
        .status(200)
        .json({ status: "success", message: "Restaurant items", datas });
    } catch (err) {
      next(err);
    }
  };

  getItemById = async (req, res, next) => {
    const id = req.params.id;
    try {
      const itemExist = await this.itemService.getItemById(id);

      if (!itemExist) {
        throw next(new HttpException(404, "Item not found"));
      }

      const item = await this.itemService.getItemById(id);

      const data = {
        id: item._id,
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        restaurantId: restaurantId,
        photo: item.photo,
        photos: item.photos,
        status: item.status,
        quantity: item.quantity,
        publish: item.publish,
        calories: item.calories,
        grams: item.grams,
        proteins: item.proteins,
        fats: item.fats,
        veg: item.veg,
        nonVeg: item.nonVeg,
        discountPrice: item.discountPrice,
        takeaway: item.takeaway,
        sizes: item.sizes,
        sizePrices: item.sizePrices,
        addOnsTitles: item.addOnsTitles,
        addOnsPrices: item.addOnsPrices,
      };

      return res.status(200).json({ status: "success", message: "Item", data });
    } catch (err) {
      next(err);
    }
  };

  updateItem = async (req, res, next) => {
    const { restaurantId, itemId } = req.params;
    const itemData = req.body;

    try {
      // Check if the restaurant exists
      const restaurantExists = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExists) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const itemExist = await this.itemService.getItemById(itemId);

      if (!itemExist) {
        throw next(new HttpException(404, "Item not found"));
      }

      if (itemExist.restaurantId !== restaurantId) {
        throw next(new HttpException(403, "Forbidden"));
      }

      const item = await this.itemService.updateItem(itemId, itemData);

      const data = {
        id: item._id,
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        restaurantId: restaurantId,
        photo: item.photo,
        photos: item.photos,
        status: item.status,
        quantity: item.quantity,
        publish: item.publish,
        calories: item.calories,
        grams: item.grams,
        proteins: item.proteins,
        fats: item.fats,
        veg: item.veg,
        nonVeg: item.nonVeg,
        discountPrice: item.discountPrice,
        takeaway: item.takeaway,
        sizes: item.sizes,
        sizePrices: item.sizePrices,
        addOnsTitles: item.addOnsTitles,
        addOnsPrices: item.addOnsPrices,
      };

      return res
        .status(200)
        .json({ status: "success", message: "Item updated", data });
    } catch (err) {
      next(err);
    }
  };

  deleteItem = async (req, res, next) => {
    const { restaurantId, itemId } = req.body;
    try {
      // Check if the restaurant exists
      const restaurantExists = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExists) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const itemExist = await this.itemService.getItemById(itemId);

      if (!itemExist) {
        throw next(new HttpException(404, "Item not found"));
      }

      if (itemExist.restaurantId !== restaurantId) {
        throw next(new HttpException(403, "Restaurant Unauthorized"));
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
