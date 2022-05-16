function showCurrentTime() {
  let now = new Date();
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let day = document.querySelector("#day");
  day.innerHTML = `${date}`;
  let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let month = months[now.getMonth()];
  let currentMonth = document.querySelector("#month");
  currentMonth.innerHTML = `${month} | `;

  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDayOfWeek = daysOfWeek[now.getDay()];
  let weekDay = document.querySelector("#day-of-week");
  weekDay.innerHTML = `${currentDayOfWeek} | `;

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let hour = document.querySelector("#hour");
  hour.innerHTML = `${hours}h`;

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentMinutes = document.querySelector("#minutes");
  currentMinutes.innerHTML = `${minutes}`;
}

function displayCity(cityInput) {
  let apiKey = "4eb9092a1ec1063ec22057d44d0bacc8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

function searchingCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city").value;
  displayCity(cityInput);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4eb9092a1ec1063ec22057d44d0bacc8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemp(response) {
  let iconElement = document.querySelector("#main-icon");
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#description").innerHTML = `Preview: ${response.data.weather[0].main}`;
  document.querySelector("#city").innerHTML = `${response.data.name}`;
  iconElement.setAttribute("src", `images/${response.data.weather[0].icon}.svg`);
  getForecast(response.data.coord);
}

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "4eb9092a1ec1063ec22057d44d0bacc8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureCelsius = document.querySelector("#temperature");
  temperatureCelsius.innerHTML = celsiusTemperature;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDaily, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
      <div class="forecast-date">${formatDay(forecastDaily.dt)}</div>
      <div class="forecast-temperature"><span class="max-temp">${Math.round(forecastDaily.temp.max)}°</span>| <span class="min-temp">${Math.round(forecastDaily.temp.min)}°</span></div>
      <img 
      src= "images/${forecastDaily.weather[0].icon}.svg" class="forecastIcons bounce"/>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function backgroundImage() {
  dayNightImage = new Date();
  change = dayNightImage.getHours();
  console.log(change);
  if (6 >= change || change >= 20) {
    document.getElementById("background").style.backgroundImage = "url('https://images.unsplash.com/photo-1599239666211-a0ddb49c6690?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80')";
  } else {
    document.getElementById("background").style.backgroundImage = "url('https://images.unsplash.com/photo-1508020268086-b96cf4f4bb2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')";
  }
}

backgroundImage();

showCurrentTime();

let form = document.querySelector("#search-city");

form.addEventListener("submit", searchingCity);

document.querySelector("#current-location").addEventListener("click", getCurrentPosition);

displayCity("Lisbon");

let celsiusTemperature = null;

let convertFahrenheit = document.querySelector("#fahrenheit");

convertFahrenheit.addEventListener("click", showFahrenheitTemperature);

let convertCelsius = document.querySelector("#celsius");

convertCelsius.addEventListener("click", showCelsiusTemperature);

displayForecast();
