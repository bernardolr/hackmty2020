var container = document.querySelector(".cont");
var seats = document.querySelectorAll(".row .seat:not(.occupied)"); //A node list of all the seats not occupied in the main area (the .row parameter stops it from getting the seats in the display above)


const count = document.getElementById("count");
const total = document.getElementById("total");

const movieSelector = document.getElementById("movie");
let ticketPrice = +movieSelector.value; //turning the string value into an int

function UpdateSelectedCount(){

    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map((seatItem) =>{ 
        return [...seats].indexOf(seatItem); }); //creating a new array containing the index's of all the occupied seats!

    localStorage.setItem("theSelectedSeats", JSON.stringify(seatsIndex));

    var numSelected = selectedSeats.length;
    count.innerText = numSelected;
    total.innerText = ticketPrice * numSelected;

}

//Save the movie index and price to local storage
function StoreMovieData(index, price){

    localStorage.setItem("movieIndexNum", index);
    localStorage.setItem("selectedMovieValue", price);

}

PopulateUI();

//Get data from localStorage and add it to the UI
function PopulateUI(){

    const seatsSaved = JSON.parse(localStorage.getItem("theSelectedSeats"));
    //getting the saved seas and parsing them back into an array

    if(seatsSaved !== null && seatsSaved.length > 0){ //Checking if there is any data saved in the array from localStorage

        seats.forEach(function(seat, index){
            //Looping through each index in the array

            if(seatsSaved.indexOf(index) > -1){
                //Checking the array is not empty

                seat.classList.add("selected");
                //Adding the selected class to the index's which are saved as selected

            }

        })

    }
}


//movie selector event listener
movieSelector.addEventListener("change", function(event){
    
    ticketPrice = +event.target.value;

    StoreMovieData(event.target.selectedIndex, event.target.value);
    
    UpdateSelectedCount();

});


//main event listener
container.addEventListener("click", function(event){

    console.log(event.target); //Shows the element clicked on inside the container
    if(event.target.classList.contains("seat") && !event.target.classList.contains("occupied")){

        event.target.classList.toggle("selected");
        
        UpdateSelectedCount();
    }

});