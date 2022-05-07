// create variables calling the current weather elements that will be changed with the API
var searchInputEl = document.getElementById('city');
var searchBtnEl = document.getElementById('search-btn');
var searchHistoryEl = document.getElementById('search-history');
var currentCityEl = document.getElementById('current-city');
var currentDateEl = document.getElementById('current-date');
var currentIconEl = document.getElementById('weather-icon');
var currentTempEl = document.getElementById('temp');
var currentWindEl = document.getElementById('wind');
var currentHumidityEl = document.getElementById('humid');
var currentUvIndexEl = document.getElementById('uv-index');
var day1Date = document.getElementById('date1');
var day1Icon = document.getElementById('icon1');
var day1Temp = document.getElementById('temp1');
var day1Wind = document.getElementById('wind1');
var day1Humidity = document.getElementById('humidity1');
var day2Date = document.getElementById('date2');
var day2Icon = document.getElementById('icon2');
var day2Temp = document.getElementById('temp2');
var day2Wind = document.getElementById('wind2');
var day2Humidity = document.getElementById('humidity2');
var day3Date = document.getElementById('date3');
var day3Icon = document.getElementById('icon3');
var day3Temp = document.getElementById('temp3');
var day3Wind = document.getElementById('wind3');
var day3Humidity = document.getElementById('humidity3');
var day4Date = document.getElementById('date4');
var day4Icon = document.getElementById('icon4');
var day4Temp = document.getElementById('temp4');
var day4Wind = document.getElementById('wind4');
var day4Humidity = document.getElementById('humidity4');
var day5Date = document.getElementById('date5');
var day5Icon = document.getElementById('icon5');
var day5Temp = document.getElementById('temp5');
var day5Wind = document.getElementById('wind5');
var day5Humidity = document.getElementById('humidity5');

// setting the date for current weather and the 5 day forecast
currentDateEl.textContent = moment().format(' (MMMM Do YYYY) ');
day1Date.textContent = moment().add(1, 'd').format("MM/DD/YYYY");
day2Date.textContent = moment().add(2, 'd').format("MM/DD/YYYY");
day3Date.textContent = moment().add(3, 'd').format("MM/DD/YYYY");
day4Date.textContent = moment().add(4, 'd').format("MM/DD/YYYY");
day5Date.textContent = moment().add(5, 'd').format("MM/DD/YYYY");

// getting data from localStorage
let storeWeather = JSON.parse(localStorage.getItem('weather')) || [];

// event listener responding to the click of the search button
searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();
    
    // calls the create button function on click
    buttonList();

    // places the capitalized city name that was searched into the top of the current weather div 
    currentCityEl.textContent = searchInputEl.value.toUpperCase();

    // used the geo API to get the lat and lon of the city that was searched by the user
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + searchInputEl.value + "&limit=1&appid=fa64d7b57973d6db14bbf5a9c0229464")
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                return response.json()
            } else {
                return Promise.reject(response)
            }
        })
        .then((data) => {
            lat = data[0].lat
            lon = data[0].lon
            console.log(lat, lon)
            console.log(data)
        
    // plugging the lat and lon into the onecall API to get the weather data for the city searched
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=fa64d7b57973d6db14bbf5a9c0229464')
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then((data) => {
            console.log(data)
            // current date weather data
            var cityData = searchInputEl.value;
            var tempData = data.current.temp;
            var windData = data.current.wind_speed;
            var humidityData = data.current.humidity;
            var uvData = data.current.uvi;
            console.log(data)
            storeData(cityData, tempData, windData, humidityData, uvData)
            currentTempEl.innerHTML = 'Temperature: ' + tempData + '°F';
            currentWindEl.innerHTML = 'Wind: ' + windData + ' MPH';
            currentHumidityEl.innerHTML = 'Humidity: ' + humidityData + '%';
            currentUvIndexEl.innerHTML = 'UV Index: ' + uvData;
            currentIconEl.innerHTML = "<img src=http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png>"
            // 5 day forcast data
            day1Temp.innerHTML = 'Temp: ' + data.daily[0].temp.max + '°F';
            day1Wind.innerHTML = 'Wind: ' + data.daily[0].wind_speed + ' MPH';
            day1Humidity.innerHTML = 'Humidity: ' + data.daily[0].humidity + '%';
            day1Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png>"
            day2Temp.innerHTML = 'Temp: ' + data.daily[1].temp.max + '°F';
            day2Wind.innerHTML = 'Wind: ' + data.daily[1].wind_speed + ' MPH';
            day2Humidity.innerHTML = 'Humidity: ' + data.daily[1].humidity + '%';
            day2Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png>"
            day3Temp.innerHTML = 'Temp: ' + data.daily[2].temp.max + '°F';
            day3Wind.innerHTML = 'Wind: ' + data.daily[2].wind_speed + ' MPH';
            day3Humidity.innerHTML = 'Humidity: ' + data.daily[2].humidity + '%';
            day3Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png>"
            day4Temp.innerHTML = 'Temp: ' + data.daily[3].temp.max + '°F';
            day4Wind.innerHTML = 'Wind: ' + data.daily[3].wind_speed + ' MPH';
            day4Humidity.innerHTML = 'Humidity: ' + data.daily[3].humidity + '%';
            day4Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png>"
            day5Temp.innerHTML = 'Temp: ' + data.daily[4].temp.max + '°F';
            day5Wind.innerHTML = 'Wind: ' + data.daily[4].wind_speed + ' MPH';
            day5Humidity.innerHTML = 'Humidity: ' + data.daily[4].humidity + '%';
            day5Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png>"
        })
    });
});

// creating the search history that will be saved in localStorage
function storeData(cityName, temperature, wind, humidity, uvi) {
    let weatherObject = {
        cityName: "",
        temperature: {},
        wind: {},
        humidity: {},
        uvi: {},
    }
    weatherObject.cityName = cityName
    weatherObject.temperature = temperature
    weatherObject.wind = wind
    weatherObject.humidity = humidity
    weatherObject.uvi = uvi
    storeWeather.push(weatherObject)
    localStorage.setItem('weather', JSON.stringify(storeWeather))
}

// dynamically created buttons that have the textContent from the locally stored searches
function buttonList() {
    var newArr = []
    for (var i = 1; i < storeWeather.length; i++){
        console.log(storeWeather[i].cityName)
        if(newArr.indexOf(storeWeather[i]) === -1){
            newArr.push(storeWeather[i]);
            var cityList = document.createElement('button');
            cityList.textContent = storeWeather[i].cityName;
            searchHistoryEl.appendChild(cityList)
        }
    };
}
