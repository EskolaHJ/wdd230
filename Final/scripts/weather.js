// js/weather.js

document.addEventListener("DOMContentLoaded", () => {
    const weatherContainer = document.getElementById("weather-info");
    const tempMaxElement = document.getElementById("temp-max");
    const apiKey = "11815ecc1b5f8df7e92e386d4cfc251d"; 
    const city = "Cozumel";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    // Fetch weather data
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Weather data could not be fetched.");
            }
            return response.json();
        })
        .then((data) => {
            populateWeather(data);
        })
        .catch((error) => {
            weatherContainer.innerHTML = `<p class="error">Unable to load weather data. Please try again later.</p>`;
            console.error("Error fetching weather data:", error);
        });

    // Populate the weather section
    function populateWeather(data) {
        // Extract relevant weather data
        const currentWeather = data.list[0]; // Current weather data
        const todayDate = new Date().getDate();

        // Find next day's forecast at 15:00 (3:00 PM)
        let nextDayWeather = null;
        for (let i = 0; i < data.list.length; i++) {
            const forecastDate = new Date(data.list[i].dt * 1000);
            if (
                forecastDate.getHours() === 15 &&
                forecastDate.getDate() !== todayDate
            ) {
                nextDayWeather = data.list[i];
                break;
            }
        }

        // Current weather
        const { temp, humidity, temp_max } = currentWeather.main;
        const { main, description, icon } = currentWeather.weather[0];

        // Next day's weather
        const nextDayTemp = nextDayWeather ? nextDayWeather.main.temp : "N/A";
        const nextDayDescription = nextDayWeather
            ? nextDayWeather.weather[0].description
            : "N/A";
        const nextDayIcon = nextDayWeather ? nextDayWeather.weather[0].icon : "";

        // Update the weather section
        weatherContainer.innerHTML = `
            <p><strong>Current Temperature:</strong> ${temp.toFixed(1)}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Conditions:</strong> ${main} - ${description}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <h3>Tomorrow at 3:00 PM</h3>
            <p><strong>Temperature:</strong> ${nextDayTemp.toFixed(1)}°C</p>
            <p><strong>Conditions:</strong> ${nextDayDescription}</p>
            ${nextDayIcon ? `<img src="https://openweathermap.org/img/wn/${nextDayIcon}@2x.png" alt="${nextDayDescription}">` : ""}
        `;

        // Update the top message with today's high temperature
        tempMaxElement.textContent = temp_max.toFixed(1);
    }

    // Close the top message
    window.closeMessage = function () {
        document.getElementById("top-message").style.display = "none";
    };
});
