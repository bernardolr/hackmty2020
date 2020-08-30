var container = document.querySelector(".container");
var seats = document.querySelectorAll(".row .seat:not(.occupied)"); //A node list of all the seats not occupied in the main area (the .row parameter stops it from getting the seats in the display above)


const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelector = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelector.value; //turning the string value into an int

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

    }
}

// Movie select event
movieSelector.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});

// Seat click event

container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected')

        updateSelectedCount();
    }
});

//Initial count and total set

updateSelectedCount();