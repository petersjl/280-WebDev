console.log("TODO: learn to use npm!");

var figlet = require("figlet");

figlet("CSSE 280 using NodeJs", function(err, data) {
	if (err) {
		console.log("Something went wrong...");
		console.dir(err);
		return;
	}
	console.log(data)
});

