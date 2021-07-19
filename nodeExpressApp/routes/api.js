const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const employeeController = require("../controllers/employee.controller");
const invetoryController = require("../controllers/invetory.controller");
const xlsxController = require("../controllers/xlsx.controller");
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

router.post(
  "/inventory/add",
  JWT.checkToken,
  invetoryController.addInventoryAPI
);
router.get(
  "/inventory/all",
  JWT.checkToken,
  invetoryController.getAllInvetoriesAPI
);
router.post(
  "/inventory/addEmployee",
  JWT.checkToken,
  invetoryController.addEmployeeToInventoryAPI
);

router.get(
  "/inventory/readXlsx",
  JWT.checkToken,
  xlsxController.readExcelFromFileSystemAPI
);
module.exports = router;
