const Router = require("express").Router();
const UserController = require("../../modules/users/user/user.controller");

const userController = new UserController();

Router.post("/register", userController.register);
Router.post("/login", userController.login);
Router.patch("/update", userController.updateData);
Router.patch("/updatePassword", userController.updatePassword);
Router.patch("/bankDetails", userController.updateBankDetails);
Router.get("/bankDetails/:id", userController.getBankDetails);
Router.get("/", userController.fetchAllUsers);
Router.delete("/delete", userController.deleteUser);

module.exports = Router;
