//DOM dependencies==========================================
//weather API key
var APIKey = "91d73ec1749355e3bf23af5b11eb2ac6";
var cityInputEl = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");
var submitBtn = document.querySelector("#submit-btn");
var badEntry = document.querySelector("#no-city");

var badData = document.querySelector("#weather-container");

//data======================================================

//functions=================================================
var getCityName = function (cityInputEl) {
  var queryString = document.location.search;
  var cityName = queryString.split("=")[1]; //not sure how this works yet

  if (cityName) {
    cityInputEl.textContent = cityName;

    getCityWeather();
  } else {
    console.log("bad!")
  }
};

function formSubmitHandler(event) {
  event.preventDefault();
  console.log("click event");

  var desiredCity = cityInputEl.value.trim();

  if (desiredCity) {
    getCityWeather(desiredCity);

    // weatherContainerEl.textContent = ""; //causing to disappear
    cityInputEl.value = "";
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
        checkWeather(data);
        return data;
      });
    } else {
      //display text sorry, city is unavailable
      console.log("city unavailable");
    }
  });
}
function getCityCoord(cityInputEl) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?" +
      cityInputEl +
      "&appid=" +
      APIKey;
  
    fetch(queryURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("coordinates" + data);
          return data;
        });
      } else {
        //display text sorry, city is unavailable
        console.log("coordinates unavailable");
      }
    });
  }

function checkWeather(data) {
document.querySelector("#city-search-display").innerHTML = cityInputEl;
console.log(data);
  document.querySelector(".temp").innerHTML = data.main.temp;
  document.querySelector(".wind").innerHTML = data.main.humidity;
  document.querySelector(".humidity").innerHTML = data.wind.speed;
}

//make this be the 5 day forecast one
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
