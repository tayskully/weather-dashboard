//DOM dependencies==========================================
var cityInputEl = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var submitBtn = document.querySelector("#submit-btn");
var badEntry = document.querySelector("#no-city");
var badData = document.querySelector("#weather-container");
var forecast = document.querySelector("#forecast-container");
var pastSearches = document.querySelector("#recent-searches");

//data======================================================
var latitude;
var longitude;
var desiredCity = "";

//functions=================================================
//trims input to make translatable
function formSubmitHandler(event) {
  event.preventDefault();
  desiredCity = cityInputEl.value.trim();
  //if the city runs the city weather function properly, then clear the entry. if not, then display error message
  if (desiredCity) {
    getCityWeather(desiredCity);
    badEntry.textContent = "";
    cityInputEl.value = "";
    return;
  } else if (desiredCity !== "") {
    badEntry.textContent = "* Please enter in a valid city";
    return;
  }
}

//saves search history
function savePastSearch() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!searchHistory.includes(desiredCity)) {
    //add new search to the array
    searchHistory.push(desiredCity);

    //save newly updated city to local storage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    //call the function that will render the buttons from local storage
    createButtons();
  }
}

createButtons();

function createButtons() {
  pastSearches.innerHTML = "";
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  // loop through the searchHistory
  for (var i = 0; i < searchHistory.length; i++) {
    // create the buttons and append them to the page
    var button = document.createElement("button");
    button.textContent = `${searchHistory[i]}`;
    button.classList = "past-search-city text-capitalize";
    pastSearches.appendChild(button);

    // add event listener to the buttons
    button.addEventListener("click", (event) => {
      if (event.target.classList.contains("past-search-city")) {
        var city = event.target.textContent;
        getCityWeather(city);
        console.log(city);
      }
    });
  }
}

function getCityWeather(desiredCity) {
  var APIKey = "91d73ec1749355e3bf23af5b11eb2ac6";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    desiredCity +
    "&appid=" +
    APIKey;

  fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var longitude = data.coord.lon;
        var latitude = data.coord.lat;
        getForecast(latitude, longitude);
        renderCitySearch(data);
        // renderPastSearch();
        savePastSearch();
      });
    } else {
      badEntry.textContent = " * Please enter in a valid city";
    }
  });
}
function getForecast(latitude, longitude) {
  var APIKey = "91d73ec1749355e3bf23af5b11eb2ac6";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    APIKey;
  fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        renderForecast(data);
        return data;
      });
    } else {
      //display text sorry, city is unavailable for 5 day forecast
      console.log("coordinates unavailable");
    }
  });
}

function renderCitySearch(data) {
  var temperatureFahrenheit = ((data.main.temp - 273.15) * 1.8 + 32).toFixed(2);
  var icon = data.weather[0].icon;
  var today = dayjs();
  var dayWeek = today.format("dddd MMM D, YYYY");

  var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  document.querySelector(
    ".city-search-display"
  ).innerHTML = `${data.name} <img src= "${iconUrl}" alt= ${data.weather[0]}> ${data.weather[0].main}`;
  document.querySelector("#weather-container").classList.remove("hide");
  document.querySelector(".date").innerHTML = `${dayWeek}`;
  document.querySelector(".temp").innerHTML = `${temperatureFahrenheit} °F`;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "mph";
}

function renderForecast(data) {
  document.querySelector("#forecast-container").classList.remove("hide");
  var forecastData = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );
  console.log(forecastData);
  forecast.innerHTML = `<h2>5-Day Forecast for ${data.city.name} </h2>`;
  forecastData.forEach((day) => {
    var date = new Date(day.dt * 1000);
    var icon = day.weather[0].icon;
    var temperature = ((day.main.temp - 273.15) * 1.8 + 32).toFixed(2);
    var humidity = day.main.humidity;
    var windSpeed = day.wind.speed;
    var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
    forecast.innerHTML += `<div class="forecast-item">
                        <p>${date.toDateString()}</p>
                        <img src= "${iconUrl}" alt= ${day.weather[0]}}>
                        <p>Temp: ${temperature}°F</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                        
                    </div>`;
  });
}
//user interactions ==========================
submitBtn.addEventListener("click", formSubmitHandler);
