let count = function (a, b, method, callback) {
  if (method === "add") {
    return callback(a + b);
  }
  //1 == '1' //true
  //1 === '1' //false
  if (method === "multiply") {
    return callback(a * b);
  }

  return callback(a - b);
};

module.exports.count = count;
