const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/auth/register", authController.registerAPI);

module.exports = router;
