const readXlsxFile = require("read-excel-file/node");
const InventoryModel = require("../models/invetory.model");

module.exports.readExcelFromFileSystemAPI = function (req, res) {
  parseXlsx("public/xt.xlsx", res);
};

module.exports.importFromXlsx = function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No files added" });
  }

  let sampleFile = req.files.xlsFile;
  const fileName = new Date().getTime() + ".xlsx";

  sampleFile.mv("public/" + fileName, function (err) {
    if (err) {
      res.status(500).json({ err });
    } else {
      parseXlsx("public/" + fileName, res);
    }
  });
};

const parseXlsx = async function (path, res) {
  const schema = {
    InventoryCode: { prop: "invetoryCode", type: String },
    Name: { prop: "name", type: String },
    Quantity: { prop: "quantity", type: Number },
    Category: { prop: "category", type: String },
  };

  readXlsxFile(path, { schema }).then(function ({ rows, errors }) {
    for (let i = 0; i <= rows.length - 1; i++) {
      let item = rows[i];
      let PromiseArray = [];
      for (let j = 0; j <= item.quantity - 1; j++) {
        PromiseArray.push(InventoryModel.addInvetory(item));
      }
      Promise.all(PromiseArray)
        .then(function (response) {
          console.log("Inventories added");
        })
        .catch(function (err) {
          res.status(200).json({ err });
        });
    }
    res.status(200).json({ msg: "All Invetories are added" });
  });
};
