var rhit = rhit || {};

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	firebase.auth().onAuthStateChanged((user) =>{
		if (user) {
			console.log("The user is signed in " + user.uid);
			console.log("display name: " + user.displayName);
			console.log("email: " + user.email);
			console.log("phone number: " + user.phoneNumber);
			console.log("isAnonymous: " + user.isAnonymous);
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

	document.getElementById("anonymousAuthButton").onclick = (event) => {
		console.log("Sign in anonymously");
		firebase.auth().signInAnonymously().catch((error) => {
			console.log("Error code: " + error.code + " " + error.message);
		})
	}

	rhit.startFirebaseUI();
};

rhit.startFirebaseUI = function() {
	var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ]
        
      };

      // Initialize the FirebaseUI Widget using Firebase.
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
}

rhit.main();
