const InventoryModel = require("../models/invetory.model");

module.exports.addInventoryAPI = function (req, res) {
  //{name:"",invetoryCode:"",category:"",quantity:4}
  let PromiseArray = [];
  for (let i = 0; i <= req.body.quantity - 1; i++) {
    PromiseArray.push(InventoryModel.addInvetory(req.body));
  }

  Promise.all(PromiseArray)
    .then(function (response) {
      res.status(200).json(response);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
};

module.exports.getAllInvetoriesAPI = async function (req, res) {
  try {
    const response = await InventoryModel.getAllInvetory(
      parseInt(req.query.page),
      parseInt(req.query.size),
      req.query.name,
      req.query.invetoryCode,
      req.query.category
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.addEmployeeToInventoryAPI = async function (req, res) {
  try {
    const response = await InventoryModel.addEmployeeToInventory(
      req.body.inventoryId,
      req.body.employeeId
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
