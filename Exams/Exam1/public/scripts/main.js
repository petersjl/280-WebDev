var rhit = rhit || {};

rhit.date = new Date();

rhit.updateTime = function () {
	document.getElementById("timeContainer").innerHTML = rhit.parseDay(rhit.date.getDay()) + ", " + 
	rhit.parseMonth(rhit.date.getMonth()) +" " + 
	rhit.date.getDate() + ", " +
	rhit.date.getFullYear() + ", " +
	rhit.date.getHours() + ":" +
	rhit.date.getMinutes();
};

rhit.parseMonth = function(month) {
	switch (month) {
		case 0: return "January";
		case 1: return "February";
		case 2: return "March";
		case 3: return "April";
		case 4: return "May";
		case 5: return "June";
		case 6: return "July";
		case 7: return "August";
		case 8: return "September";
		case 9: return "October";
		case 10: return "November";
		case 11: return "December";
	}
}

rhit.parseDay = function(day) {
	switch (day) {
		case 0: return "Sun";
		case 1: return "Mon";
		case 2: return "Tue";
		case 3: return "Wed";
		case 4: return "Thu";
		case 5: return "Fri";
		case 6: return "Sat";
	}
}

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");
	$(".two-group > button").click((evnt) => {
		let evt = $(evnt.target);
		switch (evt.data("type")) {
			case "century": 
				rhit.date.setFullYear(rhit.date.getFullYear() + parseInt(evt.data("val")) * 100);
				break;
			case "decade": 
				rhit.date.setFullYear(rhit.date.getFullYear() + parseInt(evt.data("val")) * 10);
				break;
			case "year": 
				rhit.date.setFullYear(rhit.date.getFullYear() + parseInt(evt.data("val")));
				break
			case "month": 
				rhit.date.setMonth(rhit.date.getMonth() + parseInt(evt.data("val")))
				break;
			case "day": 
				rhit.date.setDate(rhit.date.getDate() + parseInt(evt.data("val")))
				break;
			case "hour": 
			rhit.date.setHours(rhit.date.getHours() + parseInt(evt.data("val")))
				break;
		}
		rhit.updateTime();
	});
	$("#buttonReturn").click(() => {
		rhit.date = new Date();
		rhit.updateTime();
	})
	rhit.updateTime();
};

rhit.main();
