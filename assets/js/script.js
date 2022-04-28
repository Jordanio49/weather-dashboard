// create variables calling the current weather elements that will be changed with the API
var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('city');
var searchBtnEl = document.getElementById('search-btn');
var searchHistoryEl = document.getElementById('search-history');
var currentCityEl = document.getElementById('current-city');
var currentDateEl = document.getElementById('current-date');
// var currentIconEl = document.getElementById('weather-icon');
// var currentTempEl = document.getElementById('temp');
// var currentWindEl = document.getElementById('wind');
// var currentHumidityEl = document.getElementById('humid');
// var currentUvIndexEl = document.getElementById('uv-index');
var dayOne = document.getElementById('date1');
var dayTwo = document.getElementById('date2');
var dayThree = document.getElementById('date3');
var dayFour = document.getElementById('date4');
var dayFive = document.getElementById('date5');


currentDateEl.textContent = moment().format(' MMMM Do YYYY ');
dayOne.textContent = moment().add(1, 'd').format("MM/DD/YYYY");
dayTwo.textContent = moment().add(2, 'd').format("MM/DD/YYYY");
dayThree.textContent = moment().add(3, 'd').format("MM/DD/YYYY");
dayFour.textContent = moment().add(4, 'd').format("MM/DD/YYYY");
dayFive.textContent = moment().add(5, 'd').format("MM/DD/YYYY");

searchBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    currentCityEl.textContent = searchInputEl.value.toUpperCase();
    console.log(searchInputEl.value)
   
    var listEl = document.createElement('li');
    listEl.innerHTML = "<div >"
    listEl.textContent = searchInputEl.value;
    searchHistoryEl.appendChild(listEl);
    console.log(searchInputEl.value)
});

// create list with submission for value as the element 

// assume I need to create a localstorage save to geth the values for the elements so they stay on reload

// call the api and get icon, temp, wind, humidity, and uv-index for current day

// call api to get 5 day forecast with current date + 1, icon, temp, wind, humidity
// assuming I need to create a for loop to get each date and the rest can be found via api for said date