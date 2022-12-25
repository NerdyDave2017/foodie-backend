const router = require("express").Router();

router.use("/users", require("./users.routes"));
router.use("/restaurants", require("./restaurants.routes"));

module.exports = router;
