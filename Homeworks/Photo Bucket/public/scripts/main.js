var rhit = rhit || {};

rhit.FB_COLLECTION_PHOTOBUCKET = "Photos";
rhit.FB_KEY_URL = "url";
rhit.FB_KEY_CAPTION = "caption";
rhit.FB_KEY_LAST_TOUCHED = "lastTouched";
rhit.fbPicsManager = null;

function htmlToElement(html) {
	var template = document.createElement("template");
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

rhit.ListPageController = class {
	constructor() {
		document.getElementById("submitAddPhoto").onclick = (event) => {
			const url = document.getElementById("inputURL").value;
			const caption = document.getElementById("inputCaption").value;
			console.log("Adding pic with caption: " + caption + 
				"\nand url: " + url);
			rhit.fbPicsManager.add(url,caption);
		}

		$("#addPhotoDialog").on("show.bs.modal", (event) => {
			document.getElementById("inputURL").value = "";
			document.getElementById("inputCaption").value = "";
		})
		$("#addPhotoDialog").on("shown.bs.modal", (event) => {
			document.getElementById("inputURL").focus();
		})

		rhit.fbPicsManager.beginListening(this.updateList.bind(this));
	}

	_createPin(pic) {
		return htmlToElement(`
		<div class="pin" id="${pic.id}">
			<img
        	src="${pic.url}"
        	alt="${pic.caption}">
      		<p class="caption">${pic.caption}</p>
    	</div>
		`)
	}

	updateList() {
		const newList = htmlToElement('<div id="photoListContainer"></div>');

		for (let i = 0; i < rhit.fbPicsManager.length; i++){
			const pic = rhit.fbPicsManager.getPicAtIndex(i);
			const newCard = this._createPin(pic);
			newCard.onclick = (event) => {
				window.location.href = `/photodetail.html?pic=${pic.id}`;
			}
			newList.appendChild(newCard);
		}

		const oldList = document.getElementById("photoListContainer");
		oldList.removeAttribute("id");
		oldList.hidden = true;

		oldList.parentElement.appendChild(newList);
	}
}

rhit.Pic = class {
	constructor(id, url, caption){
		this.id = id;
		this.url = url;
		this.caption = caption;
	}
}

rhit.FbPicsManager = class {
	constructor() {
		this._documentSnapshots = [];
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_PHOTOBUCKET);
		this._unsubscribe = null;
	}
	add(url, caption) {
		console.log("starting add function")
		this._ref.add({
			[rhit.FB_KEY_URL]: url,
			[rhit.FB_KEY_CAPTION]: caption,
			[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now()
		})
	}
	beginListening(changeListener) {
		this._unsubscribe = this._ref
		.orderBy(rhit.FB_KEY_LAST_TOUCHED, "desc")
		.limit(50)
		.onSnapshot((querySnapshot) => {
			this._documentSnapshots = querySnapshot.docs;
			changeListener();
		})
	}
	stopListening() { this._unsubscribe() }
	update(id, url, caption) {}
	delete(id) {}
	get length() {
		return this._documentSnapshots.length;
	}
	getPicAtIndex(index) {
		const docSnapshot = this._documentSnapshots[index];
		const pic = new rhit.Pic(
			docSnapshot.id,
			docSnapshot.get(rhit.FB_KEY_URL),
			docSnapshot.get(rhit.FB_KEY_CAPTION)
		);
		return pic;
	}
}

rhit.DetailPageController = class {
	constructor() {
		document.getElementById("submitEditPhoto").onclick = (event) => {
			const caption = document.getElementById("inputCaption").value;
			rhit.fbPicManager.update(caption);
		}
		
		document.getElementById("submitDeletePhoto").onclick = () => {
			rhit.fbPicManager.delete().then(() => window.location.href = "/");
		}

		$("#editPhotoDialog").on("show.bs.modal", (event) => {
			document.getElementById("inputCaption").value = rhit.fbPicManager.caption;
		})
		$("#editPhotoDialog").on("shown.bs.modal", (event) => {
			document.getElementById("inputCaption").focus();
		})

		rhit.fbPicManager.beginListening(this.updateView.bind(this));
	}
	updateView() {
		document.getElementById("photoImage").src = rhit.fbPicManager.url;
		document.getElementById("photoImage").alt = rhit.fbPicManager.caption;
		document.getElementById("photoCaption").innerHTML = rhit.fbPicManager.caption;
	}
}

rhit.FbPicManager = class {
	constructor(picId) {
		if (picId == null) window.location.href = "/";
		this._documentSnapshot = {};
		this._unsubscribe = null;
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_PHOTOBUCKET).doc(picId);
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
	stopListening() {
		this._unsubscribe();
	};
	update(caption) {
		this._ref.update({
			[rhit.FB_KEY_CAPTION]: caption,
			[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now()
		})
	};
	delete() {
		return this._ref.delete();
	};

	get url() {
		return this._documentSnapshot.get(rhit.FB_KEY_URL);
	}

	get caption() {
		return this._documentSnapshot.get(rhit.FB_KEY_CAPTION);
	}
}

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	if(document.querySelector("#listPage")) {
		console.log("You are on the list page");
		rhit.fbPicsManager = new rhit.FbPicsManager();
		rhit.controller = new rhit.ListPageController();

	}

	if(document.querySelector("#detailPage")) {
		console.log("You are on the detail page")
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		rhit.fbPicManager = new rhit.FbPicManager(urlParams.get("pic"));
		rhit.controller = new rhit.DetailPageController();
	}

};

rhit.main();
