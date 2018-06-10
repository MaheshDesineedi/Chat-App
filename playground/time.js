var moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var date = moment();
// date.add(100,'years').subtract(9,'months');
// console.log(date.format('MMM Do YYYY HH:mm:ss a'));

// 10:35 am
// 6:01 am

// var date = moment();

// console.log(date.format('h:mm a'));

var someTimeStamp = moment();
console.log(someTimeStamp.valueOf());

var createdAt = 1234;
var date = moment(createdAt);

console.log(date.format('h:mm a'));