var rhit = rhit || {};

rhit.PageController = class {
	constructor() {
		this.game = new rhit.Game();

		const squares = document.querySelectorAll(".square");
		for (const square of squares){
			square.onclick = (event) => {
				const buttonIndex = parseInt(square.dataset.buttonIndex);
				this.game.presssedButtonAtIndex(buttonIndex);
				this.updateView();
			}
		}

		document.querySelector("#newGameButton").onclick = (event) => {
			this.game = new rhit.Game();
			this.updateView();
		}

		this.updateView();
	}



	updateView() {
		const squares = document.querySelectorAll(".square");
		squares.forEach((square, index) => {
			square.innerHTML = this.game.getMarkAtIndex(index);
		});
		document.querySelector("#gameStateText").innerHTML = this.game.getState();
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
		if (this.state == rhit.Game.State.X_WIN || 
			this.state == rhit.Game.State.O_WIN || 
			this.state == rhit.Game.State.TIE){
				return
		}
		if (this.board[buttonIndex] != rhit.Game.Mark.NONE){
			return
		}
		if (this.state == rhit.Game.State.X_TURN){
			this.board[buttonIndex] = rhit.Game.Mark.X;
			this.state = rhit.Game.State.O_TURN;
		}else{
			this.board[buttonIndex] = rhit.Game.Mark.O;
			this.state = rhit.Game.State.X_TURN;
		}
		this._checkForGameOver();
	}

	_checkForGameOver(){
		
	}

	getMarkAtIndex(buttonIndex) {
		return this.board[buttonIndex];
	}

	getState() {
		return this.state;
	}
};

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");
	new rhit.PageController();
};

rhit.main();
