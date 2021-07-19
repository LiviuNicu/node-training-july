const mongoose = require("mongoose");
const Scheema = mongoose.Schema;

const InventoryScheema = new Scheema({
  name: { type: String, required: true },
  invetoryCode: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Diverse", "Monitor", "Laptop"],
    default: "Diverse",
  },
  dateAdded: { type: Date, default: Date.now },
  _employee: { type: Scheema.Types.ObjectId, ref: "employee" },
});
const invetory = mongoose.model("inventories", InventoryScheema);

module.exports.addInvetory = function (userReq) {
  let newInventory = new invetory();

  newInventory.set("name", userReq.name);
  newInventory.set("invetoryCode", userReq.invetoryCode);
  newInventory.set("category", userReq.category);

  return new Promise(function (resolve, reject) {
    newInventory.save(function (err, invetoryAdded) {
      if (err) {
        reject({ err: err });
      } else {
        resolve({ msg: "InvetoryAdded", invetory: invetoryAdded });
      }
    });
  });
};

module.exports.getAllInvetory = function (
  page = 0,
  size = 4,
  nameFilter,
  inentoryCodeFiletr,
  categoryFilter
) {
  const query = {};
  if (nameFilter) {
    Object.assign(query, { name: { $regex: nameFilter, $options: "i" } });
  }
  if (categoryFilter) {
    Object.assign(query, { category: categoryFilter });
  }
  if (inentoryCodeFiletr) {
    Object.assign(query, { invetoryCode: inentoryCodeFiletr });
  }
  return new Promise(function (resolve, reject) {
    invetory
      .find(query)
      .limit(size)
      .skip(size * page)
      .populate("_employee")
      .exec(function (err, intentories) {
        if (err) {
          reject({ err });
        } else {
          resolve({ intentories: intentories });
        }
      });
  });
};

module.exports.addEmployeeToInventory = function (inventoryId, employeeId) {
  var query = { _id: inventoryId },
    update = { _employee: employeeId },
    options = { upsert: false, new: true };
  return new Promise(function (resolve, reject) {
    invetory.findOneAndUpdate(
      query,
      update,
      options,
      function (err, updatedIntentory) {
        if (err) {
          reject({ err: err });
        } else {
          resolve({ updatedIntentory: updatedIntentory });
        }
      }
    );
  });
};
