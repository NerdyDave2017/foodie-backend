const DineInService = require("./dineIn.services");
const RestaurantService = require("../users/restaurant/restaurant.services");
const UserService = require("../users/user/user.services");
const HttpException = require("../../exceptions/HttpExceptions");

class DineInController {
  dineInService;
  restaurantService;
  userService;
  constructor() {
    this.dineInService = new DineInService();
    this.restaurantService = new RestaurantService();
    this.userService = new UserService();
  }

  createDineIn = async (req, res, next) => {
    const { restaurantId, userId } = req.body;
    try {
      // Check if the restaurant exists
      const restaurantExists = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExists) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      // Check if the user exists
      const userExists = await this.userService.findUserById(userId);

      if (!userExists) {
        throw next(new HttpException(404, "User not found"));
      }

      const dineIn = await this.dineInService.createDineIn(req.body);

      data = {
        id: dineIn._id,
        restaurantCost: dineIn.restaurantCost,
        isDineActive: dineIn.isDineActive,
        openDineTime: dineIn.openDineTime,
        closeDineTime: dineIn.closeDineTime,
        isDineFulfiilled: dineIn.isDineFulfiilled,
        userId: dineIn.userId,
        restaurantId: dineIn.restaurantId,
      };

      return res
        .status(201)
        .json({ status: "success", message: "DineIn created", data });
    } catch (err) {
      next(err);
    }
  };

  getAllDineIn = async (req, res, next) => {
    try {
      const dineIns = await this.dineInService.getAllDineIn();

      const datas = dineIns.map((dineIn) => {
        return {
          id: dineIn._id,
          restaurantCost: dineIn.restaurantCost,
          isDineActive: dineIn.isDineActive,
          openDineTime: dineIn.openDineTime,
          closeDineTime: dineIn.closeDineTime,
          isDineFulfiilled: dineIn.isDineFulfiilled,
          userId: dineIn.userId,
          restaurantId: dineIn.restaurantId,
        };
      });

      return res
        .status(200)
        .json({ status: "success", message: "All dineIn", datas });
    } catch (err) {
      next(err);
    }
  };

  getRestaurantDineIn = async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    try {
      // Check if the restaurant exists
      const restaurantExists = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExists) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const dineIns = await this.dineInService.getRestaurantDineIn(
        req.params.restaurantId
      );

      const datas = dineIns.map((dineIn) => {
        return {
          id: dineIn._id,
          restaurantCost: dineIn.restaurantCost,
          isDineActive: dineIn.isDineActive,
          openDineTime: dineIn.openDineTime,
          closeDineTime: dineIn.closeDineTime,
          isDineFulfiilled: dineIn.isDineFulfiilled,
          userId: dineIn.userId,
          restaurantId: dineIn.restaurantId,
        };
      });

      return res
        .status(200)
        .json({ status: "success", message: "Restaurant dineIns", datas });
    } catch (err) {
      next(err);
    }
  };

  getUserDineIn = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      // Check if the user exists
      const userExists = await this.userService.findUserById(userId);

      if (!userExists) {
        throw next(new HttpException(404, "User not found"));
      }

      const dineIn = await this.dineInService.getUserDineIn(userId);
      return res

        .status(200)
        .json({ status: "success", message: "User dineIn", dineIn });
    } catch (err) {
      next(err);
    }
  };

  getDineInById = async (req, res, next) => {
    const id = req.params.id;
    try {
      const dineInExist = await this.dineInService.getDineInById(id);

      if (!dineInExist) {
        throw next(new HttpException(404, "DineIn not found"));
      }

      const dineIn = await this.dineInService.getDineInById(id);
      return res
        .status(200)
        .json({ status: "success", message: "DineIn", dineIn });
    } catch (err) {
      next(err);
    }
  };

  updateDineIn = async (req, res, next) => {
    const { restaurantId, dineInId } = req.body;

    try {
      // Check if the restaurant exists
      const restaurantExists = await this.restaurantService.findRestaurantById(
        restaurantId
      );

      if (!restaurantExists) {
        throw next(new HttpException(404, "Restaurant not found"));
      }

      const dineInExist = await this.dineInService.getDineInById(dineInId);

      if (!dineInExist) {
        throw next(new HttpException(404, "DineIn not found"));
      }

      const dineIn = await this.dineInService.updateDineIn(dineInId, req.body);
      return res
        .status(200)
        .json({ status: "success", message: "DineIn updated", dineIn });
    } catch (err) {
      next(err);
    }
  };

  deleteDineIn = async (req, res, next) => {
    const { userId, dineInId } = req.body;
    try {
      // Check if the user exists
      const userExists = await this.userService.findUserById(userId);

      if (!userExists) {
        throw next(new HttpException(404, "User not found"));
      }

      const dineInExist = await this.dineInService.getDineInById(dineInId);

      if (!dineInExist) {
        throw next(new HttpException(404, "DineIn not found"));
      }

      if (dineInExist.userId !== userId) {
        throw next(new HttpException(401, "Unauthorized"));
      }

      const dineIn = await this.dineInService.deleteDineIn(dineInId);
      return res
        .status(200)
        .json({ status: "success", message: "DineIn deleted", dineIn });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = DineInController;
