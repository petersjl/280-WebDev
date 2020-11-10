var express = require("express")
var app = express();
var cors = require("cors");

app.use(cors());

require("./models/db");

const HelloEntry = require("./models/helloEntry");

//data object for single document database
//let data=[];

const logger = require("morgan");
app.use( logger('dev') ); //helpful information serverside when requests com in.

const fs = require("fs");
const serverSideStorage = "../data/db.json";


//read and write for single document database
// fs.readFile(serverSideStorage, function(err, buf) {
// 	if(err) {
// 		console.log("error: ", err);
// 	}else {
// 		data = JSON.parse(buf.toString())
// 	}
// 	console.log("Data read from file: " + data);
// })

// function saveToServer(data){
// 	fs.writeFile(serverSideStorage, JSON.stringify(data), function(err, buf) {
// 		if(err) {
// 			console.log("error: ", err);
// 		}else {
// 			console.log("Data saved successfully");
// 		}
// 	})
// }

//middleware
var bodyParser = require("body-parser");
app.use('/api/', bodyParser.urlencoded( {extended: true} ))
app.use('/api/', bodyParser.json());

//read
app.get("/api/", function (req, res) {
	HelloEntry.find({}, (err, entries) => {
		if (err) {
			res.json(err);
			res.status(404)
		} else {
			res.status(200);
			res.json(entries);
		}
	});
	console.log("Server call to api");

	//data single file
	//res.send( data );
	//res.end();
})

//create
app.post("/api/", function (req, res) {
	let name = req.body.name;
	let count = req.body.count;
	HelloEntry.create( {
		name: name,
		count: count
	}, (err, entry) => {
		if (err) {
			res.json(err);
			res.status(400);
		} else {
			res.status(201);
			res.json(entry);
		}
	})

	// data single file
	// data.push( {"name": name, "count": count})
	// saveToServer(data);
	// console.log("Server call to api");
	// res.send( "Post successful" );
	// res.end();
})

//read one
app.get("/api/id/:id", function (req, res) {
	let id = req.params.id;
	HelloEntry.findById(id, (err, entry) => {
		if (err) {
			res.status(404);
			res.json(err);
		} else {
			res.status(200);
			res.json(entry);
		}
	})
	// data single file
	// let id = parseInt(req.params.id);
	// let result = data[id];
	// res.send( result );
	// res.end();
}).put("/api/id/:id", function (req, res) {
	let id = req.params.id;
	HelloEntry.findById(id, (err, entry) => {
		if (err) {
			res.status(404);
			res.json(err);
		} else {
			entry.name = req.body.name || entry.name;
			entry.count = req.body.count || entry.count;
			entry.save((err, entry) => {
				if(err) {
					res.status(404);
					res.json(err);
				} else {
					res.status(201);
					res.json(entry);
				}
			})
		}
	})

	// data single file
	// let id = parseInt(req.params.id);
	// let name = req.body.name;
	// let count = req.body.count;
	// data[id] = ( {"name": name, "count": count})
	// saveToServer(data);
	// res.send("PUT successful")
	// res.end();
}).delete("/api/id/:id", function (req, res) {
	let id = req.params.id;
	HelloEntry.findByIdAndDelete(id, (err, entry) => {
		if(err) {
			res.status(404);
			res.json(err);
		} else {
			res.status(204);
			res.json(null);
		}
	})

	// data single file
	// let id = parseInt(req.params.id);
	// data.splice(id, 1);
	// saveToServer(data);
	// res.send( "DELETE successful" );
	// res.end();
})

app.listen(3000); 