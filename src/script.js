function showCurrentTime() {
  let now = new Date();
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let day = document.querySelector("#day");
  day.innerHTML = `${date}`;
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[now.getMonth()];
  let currentMonth = document.querySelector("#month");
  currentMonth.innerHTML = `${month}`;

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuedsday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDayOfWeek = daysOfWeek[now.getDay()];
  let weekDay = document.querySelector("#day-of-week");
  weekDay.innerHTML = `${currentDayOfWeek},`;

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
console.log(showCurrentTime());

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

let form = document.querySelector("#search-city");

form.addEventListener("submit", searchingCity);

function showCurrentTemp(response) {
  let iconElement = document.querySelector("#main-icon");
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#description"
  ).innerHTML = `Preview: ${response.data.weather[0].main}`;
  document.querySelector("#city").innerHTML = `${response.data.name}, `;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

document
  .querySelector("#current-location")
  .addEventListener("click", getCurrentPosition);

displayCity("Lisbon");

//function showTemperatureFahrenheit(event) {
// event.preventDefault();
// let temperatureElement = document.querySelector("#temperature");
// let temperature = temperatureElement.innerHTML;
//temperatureElement.innerHTML = ` ${Math.round((temperature * 9) / 5 + 32)}`;
//}

//let change = document.querySelector("#fahrenheit");

//change.addEventListener("click", showTemperatureFahrenheit);

//function showTemperatureCelsius(event) {
// event.preventDefault();
// let temperatureCelsius = document.querySelector("#temperature");
// temperatureCelsius.innerHTML = temp;
//}

//let changeBack = document.querySelector("#celsius");

//changeBack.addEventListener("click", showTemperatureCelsius);
