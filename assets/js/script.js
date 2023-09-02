//weather API key 
var APIKey = "91d73ec1749355e3bf23af5b11eb2ac6";
var cityInputEl = document.querySelector('#city-search')
var submitBtn = document.querySelector('#submit-btn')
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


// api.openweathermap.org/data/2.5/forecast?q=Orlando&appid=91d73ec1749355e3bf23af5b11eb2ac6

