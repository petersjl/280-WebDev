var rhit = rhit || {};

rhit.counter = document.querySelector("#numberCounter");
console.log(rhit.counter);
rhit.count = 0;
rhit.colorBox = document.querySelector("#favoriteColorBox");
console.log(rhit.colorBox);
rhit.color = "#800000";
rhit.main = function () {
	console.log("Ready");
	document.querySelector("#buttonAdd").onclick = (event) => {
		console.log("clicked add");
		rhit.count++;
		rhit.counter.innerHTML = rhit.count;
	}
	document.querySelector("#buttonReset").onclick = (event) => {
		rhit.count = 0;
		rhit.counter.innerHTML = rhit.count;
	}
	document.querySelector("#buttonSub").onclick = (event) => {
		rhit.count--;
		rhit.counter.innerHTML = rhit.count;
	}
	document.querySelector("#buttonBlue").onclick = (event) => {
		rhit.color = "blue";
		rhit.colorBox.style.backgroundColor = rhit.color;
		rhit.colorBox.innerHTML = rhit.color;
	}
	document.querySelector("#buttonGreen").onclick = (event) => {
		rhit.color = "green";
		rhit.colorBox.style.backgroundColor = rhit.color;
		rhit.colorBox.innerHTML = rhit.color;
	}
	document.querySelector("#buttonRed").onclick = (event) => {
		rhit.color = "red";
		rhit.colorBox.style.backgroundColor = rhit.color;
		rhit.colorBox.innerHTML = rhit.color;
	}
	document.querySelector("#buttonPurple").onclick = (event) => {
		rhit.color = "purple";
		rhit.colorBox.style.backgroundColor = rhit.color;
		rhit.colorBox.innerHTML = rhit.color;
	}
};

rhit.main();


