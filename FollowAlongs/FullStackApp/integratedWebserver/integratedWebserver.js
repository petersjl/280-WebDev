var express = require("express")
var app = express();

let data=[];

const logger = require("morgan");
app.use( logger('dev') ); //helpful information serverside when requests com in.

const fs = require("fs");
const serverSideStorage = "../data/db.json";

fs.readFile(serverSideStorage, function(err, buf) {
	if(err) {
		console.log("error: ", err);
	}else {
		data = JSON.parse(buf.toString())
	}
	console.log("Data read from file: " + data);
})

function saveToServer(data){
	fs.writeFile(serverSideStorage, JSON.stringify(data), function(err, buf) {
		if(err) {
			console.log("error: ", err);
		}else {
			console.log("Data saved successfully");
		}
	})
}

app.use('/static', express.static("public") );


//middleware
var bodyParser = require("body-parser");
app.use('/api/', bodyParser.urlencoded( {extended: true} ))
app.use('/api/', bodyParser.json());

app.get("/api/", function (req, res) {
	console.log("Server call to api");
	res.send( data );
	res.end();
})

app.listen(3000); 