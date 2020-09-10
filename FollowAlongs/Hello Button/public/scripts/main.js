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

    document.querySelector("#resButton").onclick = (event) => {
        console.log("Reset button pressed")
        counter = 0;
        updateView();
    };
}

function updateView(){
    document.querySelector("#counterText").innerHTML = "Counter = " + counter;
}

main();