//ES5
function log(message) {
  console.log(message);
}

// const log = function (message){
//    //var i = 0;
//     console.log(message);
//     for(var i=0;i<5;i++){

//     }
//     console.log(i)//4

// }

// //ES6
// const log = message => console.log(message);

//var, let and const
// var url = "http://something.com";
// let url = "http://something.com";
const url = "http://something.com";

module.exports.log = log;
module.exports.url = url;
//expots.log=log
