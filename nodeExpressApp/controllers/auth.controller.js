const userModel = require("../models/user.model");

module.exports.registerAPI = async function (req, res) {
  try {
    const response = await userModel.register(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.registerAPIWithCallback = function (req, res) {
  userModel.registerCallback(
    req.body,
    function (response) {
      res.status(200).json(response);
    },
    function (error) {
      res.status(500).json(err);
    }
  );
};

module.exports.loginAPI = async function (req, res) {
  try {
    const response = await userModel.login(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAllUsersAPI = async function (req, res) {
  try {
    const response = await userModel.getAllUsers();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getUserByIdAPI = async function (req, res) {
  try {
    const response = await userModel.getUserById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
