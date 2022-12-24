const UserController = require("../../modules/users/user/user.controller");

const userController = new UserController();

const userRoutes = (app) => {
  app.post("/", userController.create);
  app.post("/signin", userController.signIn);
  app.put("/", userController.updateData);
  app.put("/password", userController.updatePassword);
  app.get("/", userController.fetcAllUsers);
};

module.exports = userRoutes;
