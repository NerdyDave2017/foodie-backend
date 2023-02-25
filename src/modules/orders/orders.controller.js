const OrderService = require("./orders.services");
const UserService = require("../users/user/user.services");
const RestaurantService = require("../users/restaurant/restaurant.services");
const ItemService = require("../items/item.services");
const HttpException = require("../../exceptions/HttpExceptions");

const generateTrackingCode = require("../../utils/generateTrackingCode");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
    this.userService = new UserService();
    this.restaurantService = new RestaurantService();
    this.itemService = new ItemService();
  }

  createOrder = async (req, res, next) => {
    try {
      const order = req.body;

      //Generate trackingId
      const trackingCode = generateTrackingCode();

      //Check if user exist
      const userExist = await this.userService.findUserById(order.userId);
      if (!userExist) {
        throw new HttpException(404, "User not found");
      }

      //Check if restaurant exist
      const restaurantExist = await this.restaurantService.findRestaurantById(
        order.restaurantId
      );
      if (!restaurantExist) {
        throw new HttpException(404, "Restaurant not found");
      }

      // Calculate total price
      // let totalPrice = 0;
      // order.items.forEach((item) => {
      //   this.itemService.getItemById();
      // });

      const newOrder = await this.orderService.createOrder({
        ...order,
        status: "pending",
        trackingId: trackingCode,
      });

      const data = {
        id: newOrder._id,
        userId: newOrder.userId,
        restaurantId: newOrder.restaurantId,
        driverId: newOrder.driverId,
        trackingId: newOrder.trackingId,
        items: newOrder.items,
        orderType: newOrder.orderType,
        totalPrice: newOrder.totalPrice,
        status: newOrder.status,
        offerCoupon: newOrder.offerCoupon,
        discount: newOrder.discount,
        tipValue: newOrder.tipValue,
        adminCommission: newOrder.adminCommission,
        adminCommissionType: newOrder.adminCommissionType,
        takeAway: newOrder.takeAway,
        deliveryAddress: newOrder.deliveryAddress,
        deliveryCharge: newOrder.deliveryCharge,
        specialDiscount: newOrder.specialDiscount,
        deliveryStartTime: newOrder.deliveryStartTime,
        deliveryEndTime: newOrder.deliveryEndTime,
      };

      res.status(201).json({
        status: "success",
        message: "Order Created",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getOrders = async (req, res, next) => {
    try {
      const orders = await this.orderService.getOrders();

      const datas = orders.map((order) => {
        return {
          id: order._id,
          userId: order.userId,
          restaurantId: order.restaurantId,
          driverId: order.driverId,
          trackingId: order.trackingId,
          items: order.items,
          orderType: order.orderType,
          totalPrice: order.totalPrice,
          status: order.status,
          offerCoupon: order.offerCoupon,
          discount: order.discount,
          tipValue: order.tipValue,
          adminCommission: order.adminCommission,
          adminCommissionType: order.adminCommissionType,
          takeAway: order.takeAway,
          deliveryAddress: order.deliveryAddress,
          deliveryCharge: order.deliveryCharge,
          specialDiscount: order.specialDiscount,
          deliveryStartTime: order.deliveryStartTime,
          deliveryEndTime: order.deliveryEndTime,
        };
      });

      res.status(200).json({
        status: "success",
        message: "All orders",
        datas,
      });
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      const order = await this.orderService.getOrderById(id);

      const data = {
        id: order._id,
        userId: order.userId,
        restaurantId: order.restaurantId,
        driverId: order.driverId,
        trackingId: order.trackingId,
        items: order.items,
        orderType: order.orderType,
        totalPrice: order.totalPrice,
        status: order.status,
        offerCoupon: order.offerCoupon,
        discount: order.discount,
        tipValue: order.tipValue,
        adminCommission: order.adminCommission,
        adminCommissionType: order.adminCommissionType,
        takeAway: order.takeAway,
        deliveryAddress: order.deliveryAddress,
        deliveryCharge: order.deliveryCharge,
        specialDiscount: order.specialDiscount,
        deliveryStartTime: order.deliveryStartTime,
        deliveryEndTime: order.deliveryEndTime,
      };

      res.status(200).json({
        status: "success",
        message: "Order found",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateOrderById = async (req, res, next) => {
    try {
      //Check if user exist
      //Check if order exist
      // Check if user is the one trying to update order

      const id = req.params.id;
      const userId = req.params.userId;
      const order = req.body;

      const user = await this.userService.findUserById(userId);

      if (!user) {
        throw next(new HttpException(404, "User does not exist"));
      }

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      if (orderExist.userId !== userId) {
        throw next(new HttpException(401, "Unauthorized"));
      }

      const updatedOrder = await this.orderService.updateOrderById(id, order);

      const data = {
        id: updatedOrder._id,
        userId: updatedOrder.userId,
        restaurantId: updatedOrder.restaurantId,
        driverId: updatedOrder.driverId,
        trackingId: updatedOrder.trackingId,
        items: updatedOrder.items,
        orderType: updatedOrder.orderType,
        totalPrice: updatedOrder.totalPrice,
        status: updatedOrder.status,
        offerCoupon: updatedOrder.offerCoupon,
        discount: updatedOrder.discount,
        tipValue: updatedOrder.tipValue,
        adminCommission: updatedOrder.adminCommission,
        adminCommissionType: updatedOrder.adminCommissionType,
        takeAway: updatedOrder.takeAway,
        deliveryAddress: updatedOrder.deliveryAddress,
        deliveryCharge: updatedOrder.deliveryCharge,
        specialDiscount: updatedOrder.specialDiscount,
        deliveryStartTime: updatedOrder.deliveryStartTime,
        deliveryEndTime: updatedOrder.deliveryEndTime,
      };

      res.status(200).json({
        status: "success",
        message: "Order updated",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getOrderByUserId = async (req, res, next) => {
    try {
      const { userId } = req.body;

      const user = await this.userService.find;

      if (user) {
        throw next(new HttpException(401, "User already exists"));
      }

      const orders = await this.orderService.getOrderByUserId(userId);

      const datas = orders.map((order) => {
        return {
          id: order._id,
          userId: order.userId,
          restaurantId: order.restaurantId,
          driverId: order.driverId,
          trackingId: order.trackingId,
          items: order.items,
          orderType: order.orderType,
          totalPrice: order.totalPrice,
          status: order.status,
          offerCoupon: order.offerCoupon,
          discount: order.discount,
          tipValue: order.tipValue,
          adminCommission: order.adminCommission,
          adminCommissionType: order.adminCommissionType,
          takeAway: order.takeAway,
          deliveryAddress: order.deliveryAddress,
          deliveryCharge: order.deliveryCharge,
          specialDiscount: order.specialDiscount,
          deliveryStartTime: order.deliveryStartTime,
          deliveryEndTime: order.deliveryEndTime,
        };
      });

      res.status(200).json({
        status: "success",
        message: "Order found",
        datas,
      });
    } catch (error) {
      next(error);
    }
  };

  restaurantAcceptOrder = async (req, res, next) => {
    try {
      const { orderId: id } = req.params.id;
      const { restaurantId } = req.params.restaurantId;

      const restaurantExist = await this.restaurantService.getRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant does not exist"));
      }

      if (restaurantExist._id !== restaurantId) {
        throw next(new HttpException(401, "Unauthorized"));
      }

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      const updatedOrder = await this.orderService.updateOrderById(id, {
        status: "accepted",
      });

      const data = {
        id: updatedOrder._id,
        userId: updatedOrder.userId,
        restaurantId: updatedOrder.restaurantId,
        driverId: updatedOrder.driverId,
        trackingId: updatedOrder.trackingId,
        items: updatedOrder.items,
        orderType: updatedOrder.orderType,
        totalPrice: updatedOrder.totalPrice,
        status: updatedOrder.status,
        offerCoupon: updatedOrder.offerCoupon,
        discount: updatedOrder.discount,
        tipValue: updatedOrder.tipValue,
        adminCommission: updatedOrder.adminCommission,
        adminCommissionType: updatedOrder.adminCommissionType,
        takeAway: updatedOrder.takeAway,
        deliveryAddress: updatedOrder.deliveryAddress,
        deliveryCharge: updatedOrder.deliveryCharge,
        specialDiscount: updatedOrder.specialDiscount,
        deliveryStartTime: updatedOrder.deliveryStartTime,
        deliveryEndTime: updatedOrder.deliveryEndTime,
      };

      res.status(200).json({
        status: "success",
        message: "Order Accepted",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  restaurantRejectOrder = async (req, res, next) => {
    try {
      const { orderId: id } = req.params.id;
      const { restaurantId } = req.params.restaurantId;

      const restaurantExist = await this.restaurantService.getRestaurantById(
        restaurantId
      );

      if (!restaurantExist) {
        throw next(new HttpException(404, "Restaurant does not exist"));
      }

      if (restaurantExist._id !== restaurantId) {
        throw next(new HttpException(401, "Unauthorized"));
      }

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      const updatedOrder = await this.orderService.updateOrderById(id, {
        status: "rejected",
      });

      const data = {
        id: updatedOrder._id,
        userId: updatedOrder.userId,
        restaurantId: updatedOrder.restaurantId,
        driverId: updatedOrder.driverId,
        trackingId: updatedOrder.trackingId,
        items: updatedOrder.items,
        orderType: updatedOrder.orderType,
        totalPrice: updatedOrder.totalPrice,
        status: updatedOrder.status,
        offerCoupon: updatedOrder.offerCoupon,
        discount: updatedOrder.discount,
        tipValue: updatedOrder.tipValue,
        adminCommission: updatedOrder.adminCommission,
        adminCommissionType: updatedOrder.adminCommissionType,
        takeAway: updatedOrder.takeAway,
        deliveryAddress: updatedOrder.deliveryAddress,
        deliveryCharge: updatedOrder.deliveryCharge,
        specialDiscount: updatedOrder.specialDiscount,
        deliveryStartTime: updatedOrder.deliveryStartTime,
        deliveryEndTime: updatedOrder.deliveryEndTime,
      };

      res.status(200).json({
        status: "success",
        message: "Order Rejected",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOrderById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      await this.orderService.deleteOrderById(id);
      res.status(200).json({
        status: "success",
        message: "Order deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = OrderController;
