const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const employeeController = require("../controllers/employee.controller");
const JWT = require("../middlewares/jwt");

router.post("/auth/register", authController.registerAPI);
router.post("/auth/login", authController.loginAPI);
router.get("/users", JWT.checkToken, authController.getAllUsersAPI);
router.get("/user/:id", JWT.checkToken, authController.getUserByIdAPI);
router.post("/employee/add", JWT.checkToken, employeeController.addEmployeeAPI);
router.get(
  "/employee/all",
  JWT.checkToken,
  employeeController.getAllEmployeesAPI
);
router.get(
  "/employee/getById/:id",
  JWT.checkToken,
  employeeController.getEmployeeByIdAPI
);
router.delete(
  "/employee/delete/:id",
  JWT.checkToken,
  employeeController.removeEmployeeAPI
);

router.post(
  "/employee/update/:id",
  JWT.checkToken,
  employeeController.updateEmployeesAPI
);
module.exports = router;
