//DOM dependencies==========================================
//weather API key
var APIKey = "91d73ec1749355e3bf23af5b11eb2ac6";
var cityInputEl = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");
var submitBtn = document.querySelector("#submit-btn");
var badEntry = document.querySelector("#no-city");

//data======================================================

//functions=================================================
var getCityName = function (cityInputEl) {
  var queryString = document.location.search;
  var cityName = queryString.split("=")[1]; //not sure how this works yet

  if (cityName) {
    cityInputEl.textContent = cityName;

    getCityWeather();
  } else {
    document.location.replace();
  }
};

function formSubmitHandler(event) {
  event.preventDefault();
  console.log("click event");

  var desiredCity = cityInputEl.value.trim();

  if (desiredCity) {
    getCityWeather(desiredCity);

    weatherContainerEl.textContent = "";
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
        // displayWeather(data);
        console.log(data);
      });
    } else {
      //display text sorry, city is unavailable
      console.log("city unavail :/");
    }
  });
}

// var displayWeather = function (issues) {
//     // Is there a difference between this and `!issues.length`?
//     // bang issues.length is (null, undefined, 0, or ! are all "falsey" values in JS)
//     if (issues.length === 0) {
//       issueContainerEl.textContent = 'This repo has no open issues!';
//       return;
//     }

//     for (var i = 0; i < issues.length; i++) {
//       var issueEl = document.createElement('a');
//       issueEl.classList = 'list-item flex-row justify-space-between align-center';
//       issueEl.setAttribute('href', issues[i].html_url);
//       issueEl.setAttribute('target', '_blank');

//       var titleEl = document.createElement('span');
//       titleEl.textContent = issues[i].title;
//       issueEl.appendChild(titleEl);

//       var typeEl = document.createElement('span');

//       if (issues[i].pull_request) {
//         typeEl.textContent = '(Pull request)';
//       } else {
//         typeEl.textContent = '(Issue)';
//       }

//       issueEl.appendChild(typeEl);

//       issueContainerEl.appendChild(issueEl);
//     }
//   };
submitBtn.addEventListener("click", formSubmitHandler);
