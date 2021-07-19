const mongoose = require("mongoose");
const Scheema = mongoose.Schema;

const EmployeeScheema = new Scheema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});
const employee = mongoose.model("employee", EmployeeScheema);

exports.addEmployee = function (userReq) {
  let newEmp = new employee();
  newEmp.set("name", userReq.name);
  newEmp.set("email", userReq.email);

  return new Promise((resolve, reject) => {
    newEmp.save((err, obj) => {
      if (err) {
        reject({ err });
      } else {
        resolve({ msg: "inserted", obj });
      }
    });
  });
};

exports.getAllEmployees = function () {
  return new Promise((resolve, reject) => {
    employee
      .find()
      .sort({ _id: -1 })
      .exec((err, employees) => {
        if (err) {
          reject({ err });
        } else {
          resolve(employees);
        }
      });
  });
};

exports.getNumberOfEmployees = function () {
  return new Promise((resolve, reject) => {
    employee
      .estimatedDocumentCount()
      .then((count) => {
        resolve(count);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.updateEmployee = function (id, userRequest) {
  var query = { _id: id },
    update = { name: userRequest.name, email: userRequest.email },
    options = { upsert: false, new: true };
  return new Promise((resolve, reject) => {
    employee.findOneAndUpdate(
      query,
      update,
      options,
      function (err, userUpdated) {
        if (err) {
          reject({ err });
        } else {
          resolve({ user: userUpdated });
        }
      }
    );
  });
};

exports.removeEmployee = function (id) {
  var query = { _id: id };
  return new Promise((resolve, reject) => {
    employee.findOneAndDelete(query, function (err) {
      if (err) {
        reject({ err });
      } else {
        resolve({ message: "user deleted" });
      }
    });
  });
};

exports.getEmplyeeById = function (id) {
  return new Promise((resolve, reject) => {
    employee.findOne({ _id: id }).exec((err, employee) => {
      if (err) {
        reject({ err });
      } else {
        resolve(employee);
      }
    });
  });
};

exports.Employee = employee;
