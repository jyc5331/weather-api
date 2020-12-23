//elements and global variables change all of these to querySelector
var citySearchBar = document.querySelector("#city-input");
var cityCard = document.querySelector("#city-card");
var currentCityEl = document.querySelector("#current-city");
var dateZone = document.querySelector("#date-zone");
var currentCityImage = document.querySelector("#current-city-image");
var cityCardList = document.querySelector("#city-card");
var citySearchInput = document.querySelector("#city-input");
var citySearchButton = document.querySelector("#search-button");
var apiKey = "429949f7230d365361b50b640f79e338";

//today's date
var generateDates = function (days) {
  var getDate = new Date();
  var numberOfDaysToAdd = days;
  getDate.setDate(getDate.getDate() + numberOfDaysToAdd);
  var dd = getDate.getDate();
  var mm = getDate.getMonth() + 1;
  var y = getDate.getFullYear();
  return mm + "/" + dd + "/" + y;
};
dateZone.textContent = generateDates(0);
//functions

//city search card creation
function citySearch(event) {
  event.preventDefault();
  var cityName = citySearchInput.value;
  console.log(cityName);
  var cityCardEl = document.createElement("li");
  cityCardEl.classList.add("list-group-item");
  cityCardEl.textContent = cityName;
  cityCardList.appendChild(cityCardEl);
}

function logResponseCurrent(currentWeather) {
  console.log(currentWeather);
}
function logResponseUv(currentUv) {
  console.log(currentUv);
}
function logResponseFive(fiveDayForecast) {
  console.log(fiveDayForecast);
}

function requestCurrentWeather(cityName) {
  var requestUrlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
  return fetch(requestUrlCurrent)
    .then(function (responseCurrent) {
      return responseCurrent.json();
    })
    .catch(function () {
      var searchError = "City not found";
      console.log(searchError);
    });
}
function requestUV(lat, lon) {
  //uv index API
  var requestUrlUv =
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;
  return fetch(requestUrlUv).then(function (responseUv) {
    return responseUv.json();
  });
}
function requestFive(cityName) {
  //five day forecast API
  var requestUrlFive =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
  return fetch(requestUrlFive)
    .then(function (responseFive) {
      return responseFive.json();
    })
    .catch(function () {
      var searchError = "City not found";
      console.log(searchError);
    });
}

function displayWeather(cityName) {
  requestCurrentWeather(cityName).then(function (currentWeatherData) {
    console.log(currentWeatherData);
    document.querySelector("#currentTemperature").textContent =
      currentWeatherData.main.temp;
    document.querySelector("#currentHumidity").textContent =
      currentWeatherData.main.humidity;
    document.querySelector("#currentWindSpeed").textContent =
      currentWeatherData.wind.speed;
    //lat and lon
    var lat = currentWeatherData.coord.lat;
    var lon = currentWeatherData.coord.lon;
    console.log(lat, lon);

    requestUV(currentWeatherData.coord.lat, currentWeatherData.coord.lon).then(
      function (uvData) {
        console.log(uvData);
        document.querySelector("#currentUv").textContent = uvData.value;
      }
    );
  });

  requestFive(cityName).then(function (fiveData) {
    console.log(fiveData);
    var fiveDayEl = document.querySelector("#fiveDayDiv");
    console.log(fiveDayEl);
    fiveDayData = fiveData.list.slice(0, 5);
    for (var i = 0; i < fiveDayData.length; i++) {
      var fiveDayDiv = document.createElement("div");
      fiveDayDiv.classList.add("five-day-card");
      fiveDayDiv.innerHTML =
        `           
        <div class="card">
            <div class="card-body five-day-cards">
            <h6>` +
        generateDates(i) +
        `</h6>
            <img src="` +
        fiveDayData[i].weather[0].icon +
        `.png" alt="` +
        fiveDayData[i].weather[0].description +
        `">` +
        ` <p>Temp: ` +
        fiveDayData[i].main.temp +
        `</p>
            <p>Humidity:` +
        fiveDayData[i].main.humidity +
        `</p>
            </div>
        </div>
        `;
      fiveDayEl.appendChild(fiveDayDiv);
    }
  });
}

//local storage

//event listeners and calls
var cityNew = "London";
displayWeather(cityNew);
citySearchButton.addEventListener("click", citySearch);
