var express = require("express")
var app = express();

let data=[];
let counter = 0

const fs = require("fs");
const serverSideStorage = "../data/db.json";

fs.readFile(serverSideStorage, function(err, buf) {
	if(err) {
		console.log("error: ", err);
	}else {
		data = JSON.parse(buf.toString())
		if(data.length != 0){
			counter = data[data.length-1];
		}
	}
	console.log("Data read from file");
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

app.get('/hello', function(req, res) {
	let name = req.query.name; 
	let age = req.query.age;
	res.send("<h1> Hello " + name +"</h1>" + "You are " + age+ " years old.");
})

app.get('/goodbye', function(req, res) {
	res.send("<h1>Goodbye</h1>");
})

app.post("/myPost", function(req, res) {
	res.send("HTML code. Done via a post request");
})

app.get("/users/:username", function(req, res) {
	let username = req.params.username;
	res.send("<h1>Profile for: "+ username+"</h1>");
})

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/pug', function(req,res) {
	let array=[
		{name:"Jason"},
		{name:"Eliza"},
		{name:"Dave"}
	]
	
	res.render('index', {title: 'Hey', message:'Hello there', arr: array})
})

app.get('/pug/hello', function(req,res) {
	res.render('hello', {title:"Hello Button", count: counter})
})

var bodyParser = require("body-parser");
app.use('/pug/hello', bodyParser.urlencoded( {extended: false} ))

app.post('/pug/hello', function(req,res) {
	counter = req.body.count || counter;
	data.push(counter);
	saveToServer(data);
	res.render('hello', {title:"Hello Button", count: counter})
})

app.get('/pug/history', function(req,res) {
	res.render('history', {title:"Count History", data: data})
})

app.listen(3000); 