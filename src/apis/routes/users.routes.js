const Router = require("express").Router();
const UserController = require("../../modules/users/user/user.controller");
const UserService = require("../../modules/users/user/user.services");
const userController = new UserController();

Router.post("/register", userController.register);
Router.post("/signin", userController.signIn);
Router.patch("/update", userController.updateData);
Router.patch("/updatePassword", userController.updatePassword);
Router.get("/", userController.fetchAllUsers);
Router.delete("/delete", userController.deleteUser);

module.exports = Router;
