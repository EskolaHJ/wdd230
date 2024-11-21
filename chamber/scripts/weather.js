const currentTemp = document.getElementById("current-temp");
const currentDesc = document.getElementById("current-desc");
const currentIcon = document.getElementById("current-icon");
const forecastContainer = document.getElementById("forecast");

const API_KEY = "11815ecc1b5f8df7e92e386d4cfc251d";
const LAT = "43.61722"; // Latitude of your location
const LON = "-116.21234"; // Longitude of your location

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;

// Fetch current weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherURL);
        if (response.ok) {
            const data = await response.json();
            updateCurrentWeather(data);
        } else {
            console.error("Error fetching current weather:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Fetch 3-day forecast
async function fetchForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            updateForecast(data);
        } else {
            console.error("Error fetching forecast:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Update current weather
function updateCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    currentTemp.textContent = `${temp}°F`; // Display temperature with °F
    currentDesc.textContent = capitalizeWords(description); // Capitalize description
    currentIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`; // Set icon
    currentIcon.alt = capitalizeWords(description); // Set alt text
}

// Update 3-day forecast
function updateForecast(data) {
    const filteredForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    forecastContainer.innerHTML = ""; // Clear previous forecast data

    filteredForecast.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        const temp = Math.round(day.main.temp);
        const description = capitalizeWords(day.weather[0].description);
        const icon = day.weather[0].icon;

        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <p><strong>${date}</strong></p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <p>${description}</p>
            <p>${temp}°F</p>
        `;

        forecastContainer.appendChild(card);
    });
}

// Helper function to capitalize words
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Fetch and update weather data
fetchCurrentWeather();
fetchForecast();
