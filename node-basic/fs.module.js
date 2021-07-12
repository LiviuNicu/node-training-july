const fs = require("fs");

function getFilesSync(path) {
  const files = fs.readdirSync(path);
  console.log(files);
}

function getFilesAsync(path) {
  fs.readdir(path, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      console.log("ASYNC", files);
    }
  });
}

module.exports.getFilesSync = getFilesSync;
module.exports.getFilesAsync = getFilesAsync;
