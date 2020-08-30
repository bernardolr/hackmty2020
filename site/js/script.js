var container = document.querySelector(".container");
var seats = document.querySelectorAll(".row .seat:not(.occupied)"); //A node list of all the seats not occupied in the main area (the .row parameter stops it from getting the seats in the display above)

let contador = 0

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

localStorage.clear();

populateUI();

let ticketPrice = +movieSelect.value; //turning the string value into an int

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMovieIndex', moviePrice);

}


//Update total and count variables
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Copy the seats into an array
    //Map through array
    // return a new array of indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));


    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


//Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');

            }

        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex == selectedMovieIndex;
        contador--;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});

// Seat click event

asientos = Array.from(document.querySelectorAll(".seat")).length

container.addEventListener('click', e => {
    let valor = document.querySelector("#restriccion").value;
    console.log(asientos)
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied') &&
        contador < ((asientos - 4) * (valor / 100)) - 1
    ) {
        e.target.classList.toggle('selected');
        contador++;
        updateSelectedCount();
    } else {
        //document.getElementsByClassName("movie-container").disabled = true;
        var nodes = document.getElementById("cont").getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].disabled = true;
        }
        console.log("No se puede agregar mas")
    }
});

//Initial count and total set

updateSelectedCount();