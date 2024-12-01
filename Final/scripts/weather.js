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
        // Extract current weather data
        const currentWeather = data.list.find(item => {
            const itemDate = new Date(item.dt * 1000);
            const currentDate = new Date();
            return itemDate.toDateString() === currentDate.toDateString();
        }) || data.list[0]; // Fallback to first item if not found

        const { temp, humidity, temp_max } = currentWeather.main;
        const { main, description, icon } = currentWeather.weather[0];

        // Find next day's forecast at 15:00 (3:00 PM)
        const todayDate = new Date().getDate();
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

        // Initialize variables for next day's weather
        let nextDayTemp = null;
        let nextDayDescription = "";
        let nextDayIcon = "";

        if (nextDayWeather) {
            nextDayTemp = nextDayWeather.main.temp;
            nextDayDescription = nextDayWeather.weather[0].description;
            nextDayIcon = nextDayWeather.weather[0].icon;
        }

        // Update the weather section with current weather
        let weatherHTML = `
            <p><strong>Current Temperature:</strong> ${temp.toFixed(1)}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Conditions:</strong> ${main} - ${description}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        `;

        // Add next day's weather if available
        if (nextDayWeather) {
            weatherHTML += `
                <h3>Tomorrow at 3:00 PM</h3>
                <p><strong>Temperature:</strong> ${nextDayTemp.toFixed(1)}°C</p>
                <p><strong>Conditions:</strong> ${nextDayDescription}</p>
                <img src="https://openweathermap.org/img/wn/${nextDayIcon}@2x.png" alt="${nextDayDescription}">
            `;
        } else {
            weatherHTML += `
                <h3>Tomorrow's Forecast at 3:00 PM</h3>
                <p>Data not available.</p>
            `;
        }

        weatherContainer.innerHTML = weatherHTML;

        // Update the top message with today's high temperature
        tempMaxElement.textContent = temp_max.toFixed(1);
    }

    // Close the top message
    window.closeMessage = function () {
        document.getElementById("top-message").style.display = "none";
    };
});
