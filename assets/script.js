var dayContainer = document.getElementById('cityContainer')
var forecastContainer = document.getElementById('forecastCard')
var submitBtn = document.getElementById("submitBtn");
let locationInput = document.getElementById('cityInput')

localStorage.getItem ('cityInput')

var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="

//API key for weather
var apiKey = "126e4065d97fedad97742cdb5c363ca9"

// weather API function
function fetchWeatherData () { //retrieves user input and attaches it to url as a query string
    var locationInputWeather = document.getElementById('cityInput').value 
    var locationURLWeather = weatherURL.concat(locationInputWeather) + "&Appid=" + apiKey + "&units=imperial"
    window.localStorage.setItem('location', locationInputWeather)
  fetch(locationURLWeather) // fetches data from API
  .then(res => res.json())
  .then(function (data){
    var forecast = data.main
    var icon = data.weather[0].icon
    var wind = data.wind

    var locationInputTitle = document.createElement('h2')
    var weatherDate = document.createElement('h2')
    var weatherIcon = document.createElement('img')
    var weatherCurrentTemp = document.createElement('p')
    var weatherWind = document.createElement('p')
    var weatherHumidity = document.createElement('p')
    var weatherUV = document.createElement('p')
      
    weatherDate.textContent = moment().format("dddd, MMMM Do")
    weatherDate.classList.add("current-weather-date")

    locationInputTitle.textContent = locationInput.value

    var iconURL = "https://openweathermap.org/img/wn/"
    iconimport = iconURL.concat(icon)
    weatherIcon.setAttribute("src" , iconimport+".png")
    weatherIcon.classList.add("weather-icon");

    weatherCurrentTemp.textContent = "Current Temp: " + forecast.temp
    weatherWind.textContent = "Wind: " + wind.speed + " mph"
    weatherHumidity.textContent = "Humidity: " + forecast.humidity
    weatherUV.textContent = "UV Index: " + forecast.uvindex
    weatherUV.classList.add("uv-index")

    dayContainer.append(locationInputTitle, weatherDate, weatherIcon, weatherCurrentTemp, weatherWind, weatherHumidity, weatherUV)
    dayContainer.append(weatherIcon)
  
  })
};

submitBtn.addEventListener("click", fetchWeatherData);