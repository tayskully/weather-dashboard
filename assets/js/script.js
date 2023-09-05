//DOM dependencies==========================================
//weather API key
var APIKey = "91d73ec1749355e3bf23af5b11eb2ac6";
var cityInputEl = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var submitBtn = document.querySelector("#submit-btn");
var badEntry = document.querySelector("#no-city");
var badData = document.querySelector("#weather-container");
var forecast = document.querySelector("#forecast-container");

//data======================================================
var latitude;
var longitude;

//functions=================================================

function formSubmitHandler(event) {
  event.preventDefault();
  var desiredCity = cityInputEl.value.trim();
//   localStorage.setItem(desiredCity);
//   localStorage.getItem(desiredCity) || "";

  if (desiredCity) {
    getCityWeather(desiredCity);
    cityInputEl.value = "";
  } else if (desiredCity !== "") {
    badEntry.textContent = "* Please enter in a valid city";
  } else {
    badEntry.textContent = "* Please enter in a valid city";
  }
}

function getCityWeather(cityInputEl) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityInputEl +
    "&appid=" +
    APIKey;

  fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        document.querySelector(".city-search-display").innerText =
          cityInputEl.value;
          console.log(cityInputEl.value)
        // getCityCoord();
        var longitude = data.coord.lon;
        var latitude = data.coord.lat;
        getForecast(latitude, longitude);
        renderCitySearch(data);
      });
    } else {
      badEntry.textContent = "* Please enter in a valid city";
      console.log("city unavailable");
    }
  });
}
function getForecast(latitude, longitude) {
  //is this info actually getting passed?
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
  var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  document.querySelector('.city-search-display').innerHTML = `${cityInputEl.value} "<img src= "${iconUrl}" alt= ${data.weather[0]}}>"`
  document.querySelector("#weather-container").classList.remove("hide");
  document.querySelector(".city-search-display").innerHTML = cityInputEl;
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
  forecast.innerHTML = `<h2>5-Day Forecast for ${cityInputEl.value.trim()} </h2>`;
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

submitBtn.addEventListener("click", formSubmitHandler);
