var jwt = require("jsonwebtoken");
let JWT_PRIVATE_KEY = "test";

module.exports.generateToken = function (obj) {
  return jwt.sign(obj, JWT_PRIVATE_KEY, { expiresIn: "24h" });
};

module.exports.checkToken = function (req, res, next) {
  try {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, JWT_PRIVATE_KEY);
    req.userData = decode;
    next();
  } catch (err) {
    res.status(401).json({ message: "unauthorized" });
  }
};
