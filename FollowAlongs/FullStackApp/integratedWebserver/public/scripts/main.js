const apiURL = "http://localhost:3000/api/"
var selectedId = "";
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

    document.getElementById("createButton").onclick = (event) => {
        createEntry();
    }

    document.getElementById("updateButton").onclick = (event) => {
        updateEntry();
    }

    document.getElementById("deleteButton").onclick = (event) => {
        deleteEntry();
    }

    console.log("Loading entries");
    loadEntries(); //get data from server and populate entries
}

function updateView(){
    document.querySelector("#counterText").innerHTML = "Counter = " + counter;

    if(editEntryMode) {
        document.getElementById("createButton").disabled = true;
        document.getElementById("updateButton").disabled = false;
        document.getElementById("deleteButton").disabled = false;
    } else {
        document.getElementById("createButton").disabled = false;
        document.getElementById("updateButton").disabled = true;
        document.getElementById("deleteButton").disabled = true;
    }
}

function loadEntries() {
    let entries = document.getElementById("displayEntries")
    entries.innerHTML = "";

    let allEntries = fetch( apiURL )
        .then( response => response.json())
        .then( data => {
            for (let i=0; i < data.length; i++) {
                entries.innerHTML += 
                    `<button id="id${i}"onclick=loadEntry(${i})>Select Entry</button><label>${data[i].name}</label>&nbsp;<label>${data[i].count}</label><br></br>`
            }
        })
}

function loadEntry (id) {
    selectedId = id;
    let entry = fetch( apiURL + "id/" + id)
    .then( response => response.json())
    .then( data => {
        document.getElementById("inputName").value = data.name;
        counter = data.count;
        editEntryMode = true;
        updateView();
    })
}

function createEntry() {
    let name = document.getElementById("inputName").value;
    let data = { "name": name, "count": counter };

    let entry = fetch( apiURL , {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
        .then( data => {
            editEntryMode = false;
            document.getElementById("inputName").value = "";
            counter = 0;
            updateView();
            loadEntries();
        })
        .catch( (err) => {
            console.log(err);
        })
}

function updateEntry () {
    let name = document.getElementById("inputName").value;
    let data = {"name": name, "count": counter};
    let entry = fetch( apiURL + "id/" + selectedId , {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then( data => {
        document.getElementById("inputName").value = "";
        counter = 0;
        editEntryMode = false;
        updateView();
        loadEntries();
    })
    .catch( (err) => {
        console.log(err);
    })
}

function deleteEntry () {
    let entry = fetch( apiURL + "id/" + selectedId , {method: "DELETE"})
    .then( data => {
        document.getElementById("inputName").value = "";
        counter = 0;
        editEntryMode = false;
        updateView();
        loadEntries();
    })
    .catch( (err) => {
        console.log(err);
    })
}


main();