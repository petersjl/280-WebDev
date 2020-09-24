var rhit = rhit || {};

rhit.PageController = class {
	constructor() {
		//Enable the onlclick listeners
	}

	updateView() {

	}
};

rhit.Game = class {
	constructor() {
		//TODO make instance variables
	}

	presssedButtonAtIndex(buttonIndex) {

	}

	getMarkAtIndex(buttonIndex) {
		return "X";
	}

	getState() {
		return "X's Turn";
	}
};

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");
	new rhit.PageController();
};

rhit.main();
