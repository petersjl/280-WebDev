var rhit = rhit || {};

rhit.FB_COLLECTION_MOVIEQUOTES = "MovieQuotes";
rhit.FB_KEY_QUOTE = "quote";
rhit.FB_KEY_MOVIE = "movie";
rhit.FB_KEY_AUTHOR = "author";
rhit.FB_KEY_LAST_TOUCHED = "lastTouched";
rhit.fbMovieQuotesManager = null;
rhit.fbSingleQuoteManager = null;
rhit.fbAuthManager = null;

function htmlToElement(html) {
	var template = document.createElement("template");
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

/** function and class syntax examples */
rhit.functionName = function () {
	/** function body */
};

rhit.ListPageController = class {
	constructor() {
		document.getElementById("menuShowAllQuotes").onclick = (event) => {
			window.location.href = "/list.html";
		}

		document.getElementById("menuShowMyQuotes").onclick = (event) => {
			window.location.href = `/list.html?uid=${rhit.fbAuthManager.uid}`;
		}

		document.getElementById("menuSignOut").onclick = (event) => {
			rhit.fbAuthManager.signOut();
		}

		document.getElementById("submitAddQuote").onclick = (event) => {
			const quote = document.getElementById("inputQuote").value;
			const movie = document.getElementById("inputMovie").value;
			rhit.fbMovieQuotesManager.add(quote,movie);
		}

		$("#addQuoteDialog").on("show.bs.modal", (event) => {
			document.getElementById("inputQuote").value = "";
			document.getElementById("inputMovie").value = "";
		})
		$("#addQuoteDialog").on("shown.bs.modal", (event) => {
			document.getElementById("inputQuote").focus();
		})

		rhit.fbMovieQuotesManager.beginListening(this.updateList.bind(this));
	}

	_createCard(movieQuote) {
		return htmlToElement(`
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">${movieQuote.quote}</h5>
					<h6 class="card-subtitle mb-2 text-muted">${movieQuote.movie}</h6>
				</div>
			</div>
		`)
	}

	updateList() {
		const newList = htmlToElement('<div id="quoteListContainer"></div>');

		for (let i = 0; i < rhit.fbMovieQuotesManager.length; i++){
			const mq = rhit.fbMovieQuotesManager.getMovieQuoteAtIndex(i);
			const newCard = this._createCard(mq);
			newCard.onclick = (event) => {
				//rhit.storage.setMovieQuoteId(mq.id);
				window.location.href = `/moviequote.html?mq=${mq.id}`;
			}
			newList.appendChild(newCard);
		}

		const oldList = document.getElementById("quoteListContainer");
		oldList.removeAttribute("id");
		oldList.hidden = true;

		oldList.parentElement.appendChild(newList);
	}
}

rhit.MoviewQuote = class {
	constructor(id, quote, movie){
		this.id = id;
		this.quote = quote;
		this.movie = movie;
	}
}

rhit.FbMovieQuotesManager = class {
	constructor(uid) {
		this._uid = uid;
		this._documentSnapshots = [];
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_MOVIEQUOTES);
		this._unsubscribe = null;
	}
	add(quote, movie) {
		this._ref.add({
			[rhit.FB_KEY_QUOTE]: quote,
			[rhit.FB_KEY_MOVIE]: movie,
			[rhit.FB_KEY_AUTHOR]: rhit.fbAuthManager.uid,
			[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now()
		})
	}
	beginListening(changeListener) {
		let query = this._ref.orderBy(rhit.FB_KEY_LAST_TOUCHED, "desc").limit(50)
		if (this._uid) { query = query.where(rhit.FB_KEY_AUTHOR, "==", this._uid)}
		this._unsubscribe = query
		.onSnapshot((querySnapshot) => {
			this._documentSnapshots = querySnapshot.docs;
			changeListener();
		})
	}
	stopListening() { this._unsubscribe() }
	update(id, quote, movie) {}
	delete(id) {}
	get length() {
		return this._documentSnapshots.length;
	}
	getMovieQuoteAtIndex(index) {
		const docSnapshot = this._documentSnapshots[index];
		const mq = new rhit.MoviewQuote(
			docSnapshot.id,
			docSnapshot.get(rhit.FB_KEY_QUOTE),
			docSnapshot.get(rhit.FB_KEY_MOVIE)
		);
		return mq;
	}
}

rhit.DetailPageController = class {
	constructor() {
		document.getElementById("menuSignOut").onclick = (event) => {
			rhit.fbAuthManager.signOut();
		}

		document.getElementById("submitDeleteQuote").onclick = () => {
			rhit.fbSingleQuoteManager.delete().then(() => window.location.href = "/list.html");
		}

		document.getElementById("submitEditQuote").onclick = (event) => {
			const quote = document.getElementById("inputQuote").value;
			const movie = document.getElementById("inputMovie").value;
			rhit.fbSingleQuoteManager.update(quote,movie);
		}

		$("#editQuoteDialog").on("show.bs.modal", (event) => {
			document.getElementById("inputQuote").value = rhit.fbSingleQuoteManager.quote;
			document.getElementById("inputMovie").value = rhit.fbSingleQuoteManager.movie;
		})
		$("#editQuoteDialog").on("shown.bs.modal", (event) => {
			document.getElementById("inputQuote").focus();
		})

		rhit.fbSingleQuoteManager.beginListening(this.updateView.bind(this));
	}
	updateView() {
		document.getElementById("cardQuote").innerHTML = rhit.fbSingleQuoteManager.quote;
		document.getElementById("cardMovie").innerHTML = rhit.fbSingleQuoteManager.movie;

		if (rhit.fbSingleQuoteManager.author == rhit.fbAuthManager.uid) {
			document.getElementById("menuEdit").style.display = "flex";
			document.getElementById("menuDelete").style.display = "flex";
		}
	}
}

rhit.FbSingleQuoteManager = class {
	constructor(movieQuoteId) {
		if (movieQuoteId == null) window.location.href = "/";
		this._documentSnapshot = {};
		this._unsubscribe = null;
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_MOVIEQUOTES).doc(movieQuoteId);
	}
	beginListening(changeListener) {
		this._unsubscribe = this._ref.onSnapshot((doc) => {
			if (doc.exists) {
				this._documentSnapshot = doc;
				changeListener();
			} else {
				console.log("No such document!");
			}
		})
	};
	stipListening() {
		this._unsubscribe();
	};
	update(quote, movie) {
		this._ref.update({
			[rhit.FB_KEY_QUOTE]: quote,
			[rhit.FB_KEY_MOVIE]: movie,
			[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now()
		})
	};
	delete() {
		return this._ref.delete();
	};

	get quote() {
		return this._documentSnapshot.get(rhit.FB_KEY_QUOTE);
	}

	get movie() {
		return this._documentSnapshot.get(rhit.FB_KEY_MOVIE);
	}

	get author() {
		return this._documentSnapshot.get(rhit.FB_KEY_AUTHOR);
	}
}

// rhit.storage = rhit.storage || {};
// rhit.storage.MOVIEQUOTE_ID_KEY = "movieQuoteId"
// rhit.storage.getMovieQuoteId = () => {
// 	const mqId = sessionStorage.getItem(rhit.storage.MOVIEQUOTE_ID_KEY);
// 	if (!mqId) {
// 		console.log("No movie quote id in sessionStorage!")
// 	}
// 	return mqId;
// }
// rhit.storage.setMovieQuoteId = (movieQuoteId) => {
// 	sessionStorage.setItem(rhit.storage.MOVIEQUOTE_ID_KEY, movieQuoteId);
// }

rhit.LoginPageController = class {
	constructor() {
		document.getElementById("roseFireButton").onclick = (event) => {
			rhit.fbAuthManager.signIn();
		}
	}
}

rhit.FbAuthManager = class {
	constructor() {
		this._user = null;
	}
	beginListening(changeListener){
		firebase.auth().onAuthStateChanged((user) =>{
			this._user = user;
			changeListener();
		})
	}
	signIn() {
		Rosefire.signIn("7c2909f3-080a-47a3-a2df-2214d601836c", (err, rfUser) => {
			if (err) {
			  console.log("Rosefire error!", err);
			  return;
			}
			console.log("Rosefire success!", rfUser);
			
			firebase.auth().signInWithCustomToken(rfUser.token).catch((error) => {
				if (error.code === 'auth/invalid-custom-token') {
					console.log("The token you provided is not valid.");
				} else {
					console.log("Custom auth error", error.message);
				}
			});
		  });
		  
	}
	signOut() { firebase.auth().signOut().catch((error) => console.log("Sign out error"))}
	get isSignedIn() {return !!this._user}
	get uid() {return this._user.uid}
}

rhit.checkForRedirects = function () {
	if(document.getElementById("loginPage") && rhit.fbAuthManager.isSignedIn) {
		window.location.href = "/list.html"
	}
	if(!document.getElementById("loginPage") && !rhit.fbAuthManager.isSignedIn) {
		window.location.href = "/"
	}
}

rhit.initiailizePage = function () {
	const urlParams = new URLSearchParams(window.location.search);
	if(document.querySelector("#listPage")) {
		console.log("You are on the list page");
		rhit.fbMovieQuotesManager = new rhit.FbMovieQuotesManager(urlParams.get("uid"));
		new rhit.ListPageController();

	}

	if(document.querySelector("#detailPage")) {
		console.log("You are on the detail page")
		rhit.fbSingleQuoteManager = new rhit.FbSingleQuoteManager(urlParams.get("mq"));
		new rhit.DetailPageController();
	}

	if(document.querySelector("#loginPage")) {
		console.log("You are on the login page");
		new rhit.LoginPageController();
	}
}

/* Main */
rhit.main = function () {
	console.log("Ready");

	rhit.fbAuthManager = new rhit.FbAuthManager();
	rhit.fbAuthManager.beginListening(() => {
		console.log("Is signed in: " + rhit.fbAuthManager.isSignedIn);
		rhit.checkForRedirects();
		rhit.initiailizePage();
	})

	// const ref = firebase.firestore().collection("MovieQuotes");
	// ref.onSnapshot((querySnapshot) => {
	// 	querySnapshot.forEach((doc) => {
	// 		console.log(doc.data());
	// 	})
	// })

	// ref.add({
	// 	quote: "My first test",
	// 	movie: "My first movie"
	// })
};

rhit.main();
