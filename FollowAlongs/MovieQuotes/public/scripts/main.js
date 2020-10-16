var rhit = rhit || {};

rhit.FB_COLLECTION_MOVIEQUOTES = "MovieQuotes";
rhit.FB_KEY_QUOTE = "quote";
rhit.FB_KEY_MOVIE = "movie";
rhit.FB_KEY_LAST_TOUCHED = "lastTouched";
rhit.fbMovieQuotesManager = null;

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
	constructor() {
		this._documentSnapshots = [];
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_MOVIEQUOTES);
		this._unsubscribe = null;
	}
	add(quote, movie) {
		this._ref.add({
			[rhit.FB_KEY_QUOTE]: quote,
			[rhit.FB_KEY_MOVIE]: movie,
			[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now()
		})
	}
	beginListening(changeListener) {
		this._unsubscribe = this._ref
		.orderBy(rhit.FB_KEY_LAST_TOUCHED)
		.limit(50)
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
		rhit.fbSingleQuoteManager.beginListening(this.updateView.bind(this));
	}
	updateView() {
		document.getElementById("cardQuote").innerHTML = rhit.fbSingleQuoteManager.quote;
		document.getElementById("cardMovie").innerHTML = rhit.fbSingleQuoteManager.movie;
	}
}

rhit.FbSingleQuoteManager = class {
	constructor(movieQuoteId) {
		//if (movieQuoteId == null) window.location.href = "/";
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
	update(quote, movie) {};
	delete() {};

	get quote() {
		return this._documentSnapshot.get(rhit.FB_KEY_QUOTE);
	}

	get movie() {
		return this._documentSnapshot.get(rhit.FB_KEY_MOVIE);
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
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		rhit.fbSingleQuoteManager = new rhit.FbSingleQuoteManager(urlParams.get("mq"));
		rhit.controller = new rhit.DetailPageController();
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
