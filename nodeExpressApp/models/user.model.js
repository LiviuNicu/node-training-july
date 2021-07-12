const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const JWT = require("../middlewares/jwt");

function hashPw(pwd) {
  return crypto.createHash("sha256").update(pwd).digest("base64").toString();
}

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  hashed_password: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});
const user = mongoose.model("user", UserSchema);

module.exports.register = function (userRequestFields) {
  let newUser = new user();
  newUser.set("email", userRequestFields.email);
  newUser.set("firstName", userRequestFields.firstName);
  newUser.set("lastName", userRequestFields.lastName);
  newUser.set("hashed_password", hashPw(userRequestFields.password));

  return new Promise(function (resolve, reject) {
    newUser.save(function (err, insertedUser) {
      if (err) {
        reject({ err: err });
      } else {
        resolve({ success: "User Insterted", user: insertedUser });
      }
    });
  });
};

module.exports.registerCallback = function (
  userRequestFields,
  successCallback,
  errorCallback
) {
  let newUser = new user();
  newUser.set("email", userRequestFields.email);
  newUser.set("firstName", userRequestFields.firstName);
  newUser.set("lastName", userRequestFields.lastName);
  newUser.set("hashed_password", hashPw(userRequestFields.password));

  newUser.save(function (err, insertedUser) {
    if (err) {
      errorCallback({ err: err });
    } else {
      successCallback({ success: "user inserted", user: insertedUser });
    }
  });
};

module.exports.login = function (userRequestFields) {
  return new Promise(function (resolve, reject) {
    user.findOne({ email: userRequestFields.email }).exec(function (err, user) {
      if (err) {
        reject({ err: err });
      }
      if (!user) {
        reject({ message: "User not found" });
      } else {
        if (user.hashed_password === hashPw(userRequestFields.password)) {
          const token = JWT.generateToken({ email: user.email, _id: user._id });
          resolve({ user: user, token: token });
        } else {
          reject({ message: "Wrong password" });
        }
      }
    });
  });
};
