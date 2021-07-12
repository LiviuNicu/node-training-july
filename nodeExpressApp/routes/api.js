const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const JWT = require("../middlewares/jwt");

router.post("/auth/register", authController.registerAPI);
router.post("/auth/login", authController.loginAPI);
router.post("/users", JWT.checkToken, authController.getAllUsers);
module.exports = router;
