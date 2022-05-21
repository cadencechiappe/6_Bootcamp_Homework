var dayContainer = document.getElementById('cityContainer')
var forecastContainer = document.getElementById('forecastCard')
var submitBtn = document.getElementById("submitBtn");
let locationInput = document.getElementById('cityInput')

localStorage.getItem ('cityInput')

var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="

//API key for weather
var apiKey = "126e4065d97fedad97742cdb5c363ca9"

// daily weather API function
function fetchWeatherData () { //retrieves user input and attaches it to url as a query string
    var locationInputWeather = document.getElementById('cityInput').value 
    var locationURLWeather = weatherURL.concat(locationInputWeather) + "&Appid=" + apiKey + "&units=imperial"
    window.localStorage.setItem('location', locationInputWeather)
  fetch(locationURLWeather) // fetches data from API
  .then(res => res.json())
  .then(function (data){
    var daily = data.main
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

    weatherCurrentTemp.textContent = "Temp: " + daily.temp
    weatherWind.textContent = "Wind: " + wind.speed + " mph"
    weatherHumidity.textContent = "Humidity: " + daily.humidity
    weatherUV.textContent = "UV Index: " + daily.uvindex
    weatherUV.classList.add("uv-index")

    dayContainer.append(locationInputTitle, weatherDate, weatherIcon, weatherCurrentTemp, weatherWind, weatherHumidity, weatherUV)
    dayContainer.append(weatherIcon)
  
  })
};

// forecast weather API function
function fetchForecastData () { 
    var locationInputWeather = document.getElementById('cityInput').value 
    var locationURLForecast = forecastURL.concat(locationInputWeather) + "&Appid=" + apiKey + "&units=imperial"
    window.localStorage.setItem('location', locationInputWeather)
  fetch(locationURLForecast)
  .then(res => res.json())
  .then(function (forecast){
    var forecastTemp = forecast.temperature
    var iconFor = forecast.symbol
    var iconName = iconFor.icon
    var windFor = forecast.windSpeed

    console.log(locationURLForecast)

    var forecastDate = document.createElement('h3')
    var forecastIcon = document.createElement('img')
    var forecastCurrentTemp = document.createElement('p')
    var forecastWind = document.createElement('p')
    var forecastHumidity = document.createElement('p')
      
    forecastDate.textContent = moment().format("dddd, MMMM Do")

    var iconURL = "https://openweathermap.org/img/wn/"
    iconimport = iconURL.concat(iconName)
    forecastIcon.setAttribute("src" , iconimport+".png")

    forecastCurrentTemp.textContent = "Temp: " + forecastTemp.value
    forecastWind.textContent = "Wind: " + windFor.speed + " mph"
    forecastHumidity.textContent = "Humidity: " + forecast.humidity

    forecastContainer.append(forecastDate, forecastIcon, forecastCurrentTemp, forecastWind, forecastHumidity)
    forecastContainer.append(forecastIcon)
  
  })
};


submitBtn.addEventListener("click", fetchWeatherData);
submitBtn.addEventListener("click", fetchForecastData);