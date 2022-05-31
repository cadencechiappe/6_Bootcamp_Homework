var dayContainer = document.getElementById('cityContainer')
var forecastContainer = document.getElementById('forecastCard')
var submitBtn = document.getElementById("submitBtn");
let locationInput = document.getElementById('cityInput')
let searchHistory = JSON.parse(localStorage.getItem('cityInput'))


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

    dayContainer.append(locationInputTitle, weatherDate, weatherIcon, weatherCurrentTemp, weatherWind, weatherHumidity)
    dayContainer.append(weatherIcon)
  
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var UVindexURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`
    fetch(UVindexURL)
    .then(res => res.json())
    .then(function(data){
        var UVIndex = document.createElement("p");
        UVIndex.classList.add("uv-index");
        var uviFirstEl = data.current;
        UVIndex.textContent = "UV Index: " + data.current.uvi;
        dayContainer.append(UVIndex);
    });
  })
};

var locationInputForecast = document.getElementById('cityInput').value 

// forecast weather API function
function fetchForecastData () { 
    var locationInputForecast = document.getElementById('cityInput').value 
    var locationURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationInputForecast + "&Appid=" + apiKey + "&units=imperial"
    // window.localStorage.setItem('location', locationInputForecast)
  fetch(locationURLForecast)
  .then(res => res.json())
  .then(function (data){
    var forecast = data.list
    console.log(locationURLForecast)

    for (var i = 7; i < forecast.length; i++) {
        
        // Date
        var forecastDate = document.createElement('h3')
        var fcDate = new Date(forecast[i].dt_txt)
        var month = fcDate.getMonth()
        var day = fcDate.getDate()
        var year = fcDate.getFullYear()
        forecastDate.textContent = month + "/" + day + "/" + year 

        // Temp
        var forecastTemp = document.createElement('p')
        forecastTemp.textContent = "Temperature: " + forecast[i].main.temp + "° F"

        // Wind speed
        var forecastWind = document.createElement('p')
        forecastWind.textContent = "Wind: " + forecast[i].wind.speed + " MPH"

        // Humidity
        var forecastHumidity = document.createElement('p')
        forecastHumidity.textContent = "Humidity: " + forecast[i].main.humidity + "%"

        // Weather icons
        var forecastIcon = document.createElement("img")
        var iconURL = "https://openweathermap.org/img/wn/"
        var icon = forecast[i].weather[0].icon
        var iconImport = iconURL.concat(icon)
        forecastIcon.setAttribute("src", iconImport + ".png" );
        
    //    forecastContainer.appendChild(forecastDate, forecastTemp, forecastWind, forecastHumidity,forecastIcon);
    }
  })
};

submitBtn.addEventListener("click", fetchWeatherData);
submitBtn.addEventListener("click", fetchForecastData);