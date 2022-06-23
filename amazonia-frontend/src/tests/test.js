const date = new Date();
console.log(Date.now());
console.log(date.getUTCMonth()+1);
console.log(date.getUTCDate());
console.log(date.getUTCFullYear());
console.log(date.getHours());
console.log(date.getUTCFullYear().toString().substring(2));

exports.yyyy = date.getUTCFullYear();
exports.yy = date.getUTCFullYear().toString().substring(2);
exports.mm = date.getUTCMonth() + 1;
exports.dd = date.getUTCDate();
exports.hh = date.getHours();
exports.mm = date.getMinutes();
exports.ss = date.getSeconds();