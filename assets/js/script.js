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
        document.querySelector("#city-search-display").textContent =
          cityInputEl;
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
  document.querySelector("#weather-container").classList.remove("hide");
  document.querySelector("#city-search-display").innerHTML = cityInputEl;
  document.querySelector(".temp").innerHTML = `${temperatureFahrenheit} °F`;
  document.querySelector(".wind").innerHTML = data.main.humidity + "%";
  document.querySelector(".humidity").innerHTML = data.wind.speed + "mph";
}

function renderForecast(data) {
  document.querySelector("#forecast-container").classList.remove("hide");
  var forecastData = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );
  console.log(forecastData);
  forecast.innerHTML = "<h2>5-Day Forecast</h2>";
  forecastData.forEach((day) => {
    var date = new Date(day.dt * 1000);
    var icon = day.weather[0].icon;
    var temperature = ((day.main.temp - 273.15) * 1.8 + 32).toFixed(2);
    var humidity = day.main.humidity;
    var windSpeed = day.wind.speed;
    var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
    forecast.innerHTML += `<div class="forecast-item">
                        <p>Date: ${date.toDateString()}</p>
                        <img src= "${iconUrl}" alt= ${day.weather[0]}}>
                        <p>Temp: ${temperature}°C</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                        
                    </div>`;
  });
}

//make this be the 5 day forecast one
//render each card function
//var today = dayjs(); documnet.querySelector('#1a').text(today.format('MMM D, YYYY'));
//or will it be available in the data ???
// var displayForecast = function (data, cityInputEl) {
//   if (weather.length === 0) {
//     badData.textContent = "No weather data available now";
//     return;
//   }

//   for (var i = 0; i < repos.length; i++) {
//     var repoEl = document.createElement("a");
//     repoEl.classList = "list-item flex-row justify-space-between align-center";
//     repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

//     var titleEl = document.createElement("span");
//     titleEl.textContent = repoName;

//     repoEl.appendChild(titleEl);

//     var statusEl = document.createElement("span");
//     statusEl.classList = "flex-row align-center";

//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" +
//         repos[i].open_issues_count +
//         " issue(s)";
//     } else {
//       statusEl.innerHTML =
//         "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     repoEl.appendChild(statusEl);

//     repoContainerEl.appendChild(repoEl);
//   }
// };

submitBtn.addEventListener("click", formSubmitHandler);
