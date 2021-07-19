const fs = require("fs");
const employeeModel = require("../models/employee.model");

exports.addEmployeeAPI = async function (req, res) {
  try {
    const response = await employeeModel.addEmployee(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllEmployeesAPI = async function (req, res) {
  try {
    const response = await employeeModel.getAllEmployees();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateEmployeesAPI = async function (req, res) {
  try {
    const response = await employeeModel.updateEmployee(
      req.params.id,
      req.body
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.removeEmployeeAPI = async function (req, res) {
  try {
    const response = await employeeModel.removeEmployee(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getEmployeeByIdAPI = async function (req, res) {
  try {
    const response = await employeeModel.getEmplyeeById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
