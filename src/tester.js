const USER = require('./user');

let k = new USER(1,2,3,4,5);
let l = new USER(0,9,8,7,6);
l.id=10;
console.log(k.username);
console.log(l);