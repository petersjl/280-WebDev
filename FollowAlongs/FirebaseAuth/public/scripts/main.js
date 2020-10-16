var rhit = rhit || {};

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	const inputEmailEl = document.getElementById("inputEmail");
	const inputPasswordEl = document.getElementById("inputPassword");

	document.getElementById("signOutButton").onclick = (event) => {
		console.log("Sign out")
	}
	document.getElementById("createAccountButton").onclick = (event) => {
		console.log(`Create account for email: ${inputEmailEl.value} password: ${inputPasswordEl.value}`)
	}
	document.getElementById("logInButton").onclick = (event) => {
		console.log(`Log in for email: ${inputEmailEl.value} password: ${inputPasswordEl.value}`)
	}
};

rhit.main();
