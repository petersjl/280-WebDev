var rhit = rhit || {};

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	firebase.auth().onAuthStateChanged((user) =>{
		if (user) {
			console.log("The user is signed in " + user.uid);
		}else{
			console.log("There is no user signed in")
		}
	})

	const inputEmailEl = document.getElementById("inputEmail");
	const inputPasswordEl = document.getElementById("inputPassword");

	document.getElementById("signOutButton").onclick = (event) => {
		console.log("Sign out")
		firebase.auth().signOut().then(() => {
			console.log("User has been signed out");
		});
	}
	document.getElementById("createAccountButton").onclick = (event) => {
		console.log(`Create account for email: ${inputEmailEl.value} password: ${inputPasswordEl.value}`)
		firebase.auth().createUserWithEmailAndPassword(inputEmailEl.value, inputPasswordEl.value).catch((error) => {
			console.log("Error code: " + error.code + " " + error.message);
		})
	}
	document.getElementById("logInButton").onclick = (event) => {
		console.log(`Log in for email: ${inputEmailEl.value} password: ${inputPasswordEl.value}`)
		firebase.auth().signInWithEmailAndPassword(inputEmailEl.value, inputPasswordEl.value).catch((error) => {
			console.log("Error code: " + error.code + " " + error.message);
		})
	}
};

rhit.main();
