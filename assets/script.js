//elements and global variables
var citySearchBar = document.getElementById("city-input");
var cityCard = document.getElementById("city-card");
var currentCityEl = document.getElementById("current-city");
var dateZone = document.getElementsByClassName("date-zone");
var currentCityImage = document.getElementsByClassName("current-city-image");
var apiKey = "429949f7230d365361b50b640f79e338";
var lat = 20;
var lon = 20;

//today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = mm + "/" + dd + "/" + yyyy;

//functions
function logResponseCurrent(currentWeather) {
  console.log(currentWeather);
}
function logResponseUv(currentUv) {
  console.log(currentUv);
}
function logResponseFive(fiveDayForecast) {
  console.log(fiveDayForecast);
}
//apis
//current weather
var requestUrlCurrent =
  "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=" +
  apiKey;
fetch(requestUrlCurrent)
  .then(function (responseCurrent) {
    return responseCurrent.json();
  })
  .then(function (dataCurrent) {
    logResponseCurrent(dataCurrent);
  });
//uv index
var requestUrlUv =
  "http://api.openweathermap.org/data/2.5/uvi?lat=" +
  lat +
  "&lon=" +
  lon +
  "&appid=" +
  apiKey;
fetch(requestUrlUv)
  .then(function (responseUv) {
    return responseUv.json();
  })
  .then(function (dataUv) {
    logResponseUv(dataUv);
  });
//five day forecast
var requestUrlFive =
  "http://api.openweathermap.org/data/2.5/forecast?q=London&appid=" + apiKey;
fetch(requestUrlFive)
  .then(function (responseFive) {
    return responseFive.json();
  })
  .then(function (dataFive) {
    logResponseFive(dataFive);
  });

//local storage

//event listeners and calls
