const os = require("os");

function getOSinformations() {
  console.log(
    os.platform(),
    os.type(),
    os.freemem(),
    os.totalmem(),
    os.userInfo()
  );
}

module.exports.getOSinformations = getOSinformations;
