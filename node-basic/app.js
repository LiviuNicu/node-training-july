const loggerModule = require("./logger.module");
const callbackModule = require("./callback.module");
const promiseModule = require("./promise.module");
const fsModule = require("./fs.module");
const osModule = require("./os.module");
const httpModule = require("./http.module");
console.log(loggerModule);

callbackModule.count(2, 3, "add", function (number) {
  console.log(number);
});
callbackModule.count(2, 3, "multiply", function (number) {
  console.log(number);
});
callbackModule.count(2, 3, undefined, function (number) {
  console.log(number);
});

//ES5
promiseModule
  .promise("test")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });
promiseModule
  .promise(1)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });
//ES6
async function checkPromise(str) {
  try {
    const response = await promiseModule.promise(str);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
checkPromise("TEST ASYNC");
checkPromise(4);

(async function () {
  try {
    const response1 = await promiseModule.promise("TEST ANONIMUS");
    const response2 = await promiseModule.promise(5);
    console.log(response1, response2);
  } catch (err) {
    console.log(err);
  }
})();

fsModule.getFilesSync("./");
fsModule.getFilesAsync("./");

osModule.getOSinformations();

httpModule.startServer();
