const express = require("express");
const router = require("express").Router();

router.use("/users", require("./users.routes"));

module.exports = router;
