const apiURL = "http://localhost:3000/api/"
var selectedID = "";
var editEntryMode = false;

var counter = 0;

function main(){
    console.log("Ready");

    document.querySelector("#decButton").onclick = (event) => {
        console.log("Decrement button pressed")
        counter = counter - 1;
        updateView();
    };

    document.querySelector("#incButton").onclick = (event) => {
        console.log("Increment button pressed")
        counter = counter + 1;
        updateView();
    };

    document.querySelector("#resetButton").onclick = (event) => {
        console.log("Reset button pressed")
        counter = 0;
        updateView();
    };

    console.log("Loading entries");
    loadEntries(); //get data from server and populate entries
}

function updateView(){
    document.querySelector("#counterText").innerHTML = "Counter = " + counter;
}

function loadEntries() {
    let entries = document.getElementById("displayEntries")
    entries.innerHTML = "";

    let allEntries = fetch( apiURL )
        .then( response => response.json())
        .then( data => {
            for (let i=0; i < data.length; i++) {
                entries.innerHTML += 
                    `<button id="id${i}">Select Entry</button><label>${data[i].name}</label>&nbsp;<label>${data[i].count}</label><br></br>`
            }
        })
}


main();