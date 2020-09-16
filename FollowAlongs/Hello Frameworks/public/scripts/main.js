/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * Joseph Peters
 */

/** namespace. */
var rhit = rhit || {};

/** globals */
rhit.counter = 0;

/** function and class syntax examples */
rhit.functionName = function () {
	/** function body */
};

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");
	const buttons = document.querySelectorAll("#counterButtons button");
	// for (let i = 0; i < buttons.length; i++){
	// 	let button = buttons[i];
	// 	button.onclick = (event) => {
	// 		console.log(`You pressed`, button)
	// 	}
	// }
	
	for (const button of buttons) {
		button.onclick = (event) => {
			console.log(`You pressed`, button)
		}
	}
};

rhit.main();
