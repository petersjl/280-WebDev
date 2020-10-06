var rhit = rhit || {};

rhit.FB_COLLECTION_MOVIEQUOTE = "MovieQuotes";
rhit.FB_KEY_QUOTE = "quote";
rhit.FB_KEY_MOVIE = "movie";
rhit.FB_KEY_LAST_TOUCHED = "lastTouched";
rhit.fbMovieQuotesManager = null;

/** function and class syntax examples */
rhit.functionName = function () {
	/** function body */
};

rhit.ListPageController = class {
	constructor() {
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
	}

	methodName() {

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
	constructor() {
		this._documentSnapshots = [];
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_MOVIEQUOTE);
	}
	add(quote, movie) {
		this._ref.add({
			[rhit.FB_KEY_QUOTE]: quote,
			[rhit.FB_KEY_MOVIE]: movie,
			[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now()
		})
	}
	beginListening(changeListener) {}
	stopListening() {}
	update(id, quote, movie) {}
	delete(id) {}
	get length() {}
	getMovieQuoteAtIndex(index) {}
}

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	if(document.querySelector("#listPage")) {
		console.log("You are on the list page");
		rhit.fbMovieQuotesManager = new rhit.FbMovieQuotesManager();
		rhit.controller = new rhit.ListPageController();

	}

	if(document.querySelector("#detailPage")) {
		console.log("You are on the detail page")

	}

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
