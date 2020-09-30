var rhit = rhit || {};

rhit.variableName = "";

rhit.functionName = function () {
	/** function body */
};

rhit.LinearLightsOutGame = class {
	
	constructor() {
		this.numLights = 7;
		this.lights = [];
		this.numPresses = 0;
		this.gameLabel = document.getElementById("gameStateTag");

		this.lightOn = "#F8C02E";
		this.lightOff = "#343A40";


		this.generateButtons();
		document.getElementById("buttonNewGame").onclick = () => this.startNewGame();
		this.startNewGame();
	}

	generateButtons(){
		let buttonHolder = document.getElementById("buttonsHolder");
		for (const light of this.lights){
			buttonHolder.removeChild(light);
		}
		this.lights = [];
		for(let i = 0; i < this.numLights; i++){
			//buttonHolder.innerHTML += "<button class=\"buttonLight\">0</button>";
			let btn = document.createElement("BUTTON");
			btn.innerHTML = '0';
			btn.classList.add("light");
			btn.classList.add("btn");
			btn.classList.add("btn-primary");
			btn.onclick = () => this.pushButtonAtIndex(i);
			this.lights.push(btn);
			buttonHolder.appendChild(btn);
		}
	}

	pushButtonAtIndex(index) {
		let btn = this.lights[index];
		btn.innerHTML = btn.innerHTML == "0" ? 1 : 0;
		btn.style.color = btn.innerHTML == "0" ? "white" : "black";
		btn.style.backgroundColor = btn.innerHTML == "0" ? this.lightOff : this.lightOn;
		if (index > 0) {
			btn = this.lights[index - 1];
			btn.innerHTML = btn.innerHTML == "0" ? 1 : 0;
			btn.style.color = btn.innerHTML == "0" ? "white" : "black";
			btn.style.backgroundColor = btn.innerHTML == "0" ? this.lightOff : this.lightOn;
		}
		if (index < this.numLights - 1) {
			btn = this.lights[index + 1];
			btn.innerHTML = btn.innerHTML == "0" ? 1 : 0;
			btn.style.color = btn.innerHTML == "0" ? "white" : "black";
			btn.style.backgroundColor = btn.innerHTML == "0" ? this.lightOff : this.lightOn;
		}
		this.numPresses++;
		this.gameLabel.innerHTML = `You have taken ${this.numPresses} ${this.numPresses == 1 ? "move" : "moves"} so far.`;
		this.checkWin();
	}

	checkWin() {
		let contains0 = false;
		let contains1 = false;
		for(const light of this.lights){
			if (light.innerHTML == "0") contains0 = true;
			else contains1 = true;
		}

		if (contains0 && contains1) return false;

		this.gameLabel.innerHTML = `You won in ${this.numPresses} moves!`;
		for (const light of this.lights) {
			light.disabled = true;
		}
		return true;
	}

	randomize(){
		let numTurns = Math.floor(Math.random() * this.numLights * 1.25) + Math.floor(this.numLights * .25);
		for (let i = 0; i < numTurns; i++) {
			this.pushButtonAtIndex(Math.floor(Math.random() * this.numLights));
		}
		if (this.checkWin) this.randomize();
	}

	startNewGame(){
		if (this.numLights != this.lights.length) this.generateButtons();
		this.randomize();
		this.numPresses = 0;
		this.gameLabel.innerHTML = "Make the buttons match"
		for (const light of this.lights){
			light.disabled = false;
		}
	}
}

rhit.main = function () {
	console.log("Ready");
	rhit.game = new rhit.LinearLightsOutGame();
};

rhit.main();
