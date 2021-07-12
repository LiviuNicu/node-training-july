const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const JWT = require("../middlewares/jwt");

router.post("/auth/register", authController.registerAPI);
router.post("/auth/login", authController.loginAPI);
router.get("/users", JWT.checkToken, authController.getAllUsersAPI);
router.get("/user/:id", JWT.checkToken, authController.getUserByIdAPI);
module.exports = router;
