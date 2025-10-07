const API_KEY = "3d8273d51d989febef2060aad32a3931"; // 🔑 Replace with your OpenWeather API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherBox = document.getElementById("weather");
const errorBox = document.getElementById("error");

async function fetchWeather(city) {
  try {
    errorBox.textContent = "";
    weatherBox.style.display = "none";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    errorBox.textContent = err.message;
  }
}

function displayWeather(data) {
  document.getElementById("cityName").textContent =
    data.name + ", " + data.sys.country;
  document.getElementById("temp").textContent =
    Math.round(data.main.temp) + "°C";
  document.getElementById("desc").textContent = data.weather[0].description;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("wind").textContent = data.wind.speed;
  document.getElementById("humidity").textContent = data.main.humidity;
  weatherBox.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});