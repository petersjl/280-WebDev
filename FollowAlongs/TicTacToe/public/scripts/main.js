var rhit = rhit || {};

rhit.PageController = class {
	constructor() {
		this.game = new rhit.Game();
	}

	updateView() {

	}
};

rhit.Game = class {

	static Mark = {
		X: "X",
		O: "O",
		NONE: " "
	}

	static State = {
		X_TURN: "X's Turn",
		O_TURN: "O's Turn",
		X_WIN: "X Wins!",
		O_WIN: "O Wins!",
		TIE: "Tie Game"
	}

	constructor() {
		this.board = [];
		this.state = rhit.Game.State.X_TURN;

		for(let k = 0; k < 9; k++){
			this.board.push(rhit.Game.Mark.NONE);
		}
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
