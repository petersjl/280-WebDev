const myModule = require("./myOtherFile");

console.clear()
console.log("counter = ", myModule.getCounter());
myModule.inc();
myModule.inc();
myModule.inc();
console.log("counter = ", myModule.getCounter());