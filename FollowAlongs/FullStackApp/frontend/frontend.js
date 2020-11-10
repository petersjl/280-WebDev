var express = require("express")
var app = express();

app.use('/static', express.static("public") );

app.listen( 8080 ); 