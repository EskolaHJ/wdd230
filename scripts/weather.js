// Select HTML elements for manipulation
const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const weatherIcon = document.querySelector("#weather-icon");

// OpenWeatherMap API URL
const url = "https://api.openweathermap.org/data/2.5/weather?lat=43.615&lon=-116.2023&units=imperial&appid=11815ecc1b5f8df7e92e386d4cfc251d";

// Fetch and display weather data
async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            updateWeather(data);
        } else {
            console.error("API Error: ", await response.text());
        }
    } catch (error) {
        console.error("Fetch Error: ", error);
    }
}

// Update the information card with weather data
function updateWeather(data) {
    const temp = Math.round(data.main.temp); // Round temperature
    const description = capitalizeWords(data.weather[0].description); // Capitalized description
    const icon = data.weather[0].icon; // Weather icon code

    // Update HTML elements
    currentTemp.textContent = temp;
    weatherDesc.textContent = description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.alt = description;
}

// Helper function to capitalize each word
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Call the fetch function
fetchWeather();
