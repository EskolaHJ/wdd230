// js/weather.js

document.addEventListener("DOMContentLoaded", () => {
    const weatherContainer = document.getElementById("weather-info");
    const tempMaxElement = document.getElementById("temp-max");
    const apiKey = "11815ecc1b5f8df7e92e386d4cfc251d"; 
    const city = "Cozumel";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    /**
     * Fetches weather data from OpenWeatherMap API.
     */
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Weather data could not be fetched. Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched Weather Data:", data);
            populateWeather(data);
        })
        .catch((error) => {
            displayError("Unable to load weather data. Please try again later.");
            console.error("Error fetching weather data:", error);
        });

    /**
     * Converts a UTC timestamp to local time based on the provided timezone offset.
     * @param {number} timestamp - The UTC timestamp in seconds.
     * @param {number} offsetSeconds - The timezone offset in seconds.
     * @returns {Date} - The local Date object.
     */
    function convertToLocalTime(timestamp, offsetSeconds) {
        // Convert timestamp and offset to milliseconds and create a new Date object
        return new Date((timestamp + offsetSeconds) * 1000);
    }

    /**
     * Finds the closest forecast entry to the target hour on the target date.
     * @param {Array} forecasts - The list of forecast entries.
     * @param {Date} targetDate - The target date for which to find the forecast.
     * @param {number} targetHour - The target hour (e.g., 15 for 3:00 PM).
     * @param {number} timezoneOffset - The timezone offset in seconds.
     * @returns {Object|null} - The closest forecast entry or null if not found.
     */
    function findClosestForecast(forecasts, targetDate, targetHour, timezoneOffset) {
        let closestForecast = null;
        let smallestHourDifference = Infinity;

        forecasts.forEach(item => {
            const forecastDate = convertToLocalTime(item.dt, timezoneOffset);
            if (forecastDate.toDateString() === targetDate.toDateString()) {
                const hourDifference = Math.abs(forecastDate.getHours() - targetHour);
                if (hourDifference < smallestHourDifference) {
                    smallestHourDifference = hourDifference;
                    closestForecast = item;
                }
            }
        });

        return closestForecast;
    }

    /**
     * Displays an error message to the user within the weather container.
     * @param {string} message - The error message to display.
     */
    function displayError(message) {
        weatherContainer.innerHTML = `
            <p class="error">${message}</p>
        `;
    }

    /**
     * Populates the weather section with current and next day's forecast.
     * @param {Object} data - The weather data fetched from the API.
     */
    function populateWeather(data) {
        try {
            const timezoneOffset = data.city.timezone; // Timezone offset in seconds
            console.log("Timezone Offset (seconds):", timezoneOffset);

            // Get current date in local time
            const nowUTC = new Date();
            const nowLocal = new Date(nowUTC.getTime() + timezoneOffset * 1000);
            const todayLocalDate = nowLocal.toDateString();
            console.log("Today's Date (Local):", todayLocalDate);

            // Find current weather data
            const currentWeather = data.list.find(item => {
                const itemLocalDate = convertToLocalTime(item.dt, timezoneOffset).toDateString();
                console.log("Comparing Dates:", itemLocalDate, todayLocalDate);
                return itemLocalDate === todayLocalDate;
            }) || data.list[0]; // Fallback to first item if not found

            console.log("Current Weather:", currentWeather);

            const { temp, humidity, temp_max } = currentWeather.main;
            const { main, description, icon } = currentWeather.weather[0];

            // Define target date and hour for tomorrow at 3:00 PM
            const tomorrowLocal = new Date(nowLocal);
            tomorrowLocal.setDate(tomorrowLocal.getDate() + 1);
            const targetDate = tomorrowLocal.toDateString();
            const targetHour = 15; // 3:00 PM

            console.log("Looking for forecast on:", targetDate, "at around", targetHour + ":00");

            // Find the closest forecast to 3:00 PM on the target date
            const nextDayWeather = findClosestForecast(data.list, tomorrowLocal, targetHour, timezoneOffset);

            if (nextDayWeather) {
                console.log("Found Next Day Weather:", nextDayWeather);
            } else {
                console.warn("Next day's weather at or near 3:00 PM not found in the forecast data.");
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
        } catch (error) {
            displayError("An unexpected error occurred while processing weather data.");
            console.error("Error processing weather data:", error);
        }
    }

    /**
     * Closes the top message when the user clicks the close button.
     */
    window.closeMessage = function () {
        document.getElementById("top-message").style.display = "none";
    };
});
