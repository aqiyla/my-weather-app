let now = new Date();

let today = document.querySelector("#date");
let time = document.querySelector("#time");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let month = months[now.getMonth()];

today.innerHTML = `${day}, ${month}/${date}`;
time.innerHTML = `${hours}:${minutes}`;

function showCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector(".weather-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
}

function searchCity(city) {
  let apiKey = "77cc6e139312be6o1cb19t94fd0aeff4a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query={city}&key={apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "7cc6e139312be6o1cb19t94fd0aeff4a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon={lon}&lat={lat}&key={apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
