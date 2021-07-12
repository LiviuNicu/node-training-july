const returnApromise = function (data) {
  return new Promise(function (resolve, reject) {
    if (typeof data === "string") {
      resolve(data + " is a string");
    } else {
      reject(data + " is not a string");
    }
  });
};

module.exports.promise = returnApromise;
