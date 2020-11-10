const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const app = express();
app.use(cors({origin: true}));

app.get("/getmove/:board", (req, res) => {
    const boardString = req.params.board;

    const openLocations = getOpenLocations(boardString);

    const moveSelected = openLocations[Math.floor(Math.random() * openLocations.length)];

    res.send({"move": moveSelected});
})

function getOpenLocations(boardString) {
    const openLocations = [];
    for (var i = 0; i < boardString.length; i++) {
      if (boardString.charAt(i) == '-') {
        openLocations.push(i)
      }
    }
    return openLocations;
}

exports.api = functions.https.onRequest(app);