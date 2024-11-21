const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.7499&lon=6.6371&units=imperial&appid=11815ecc1b5f8df7e92e386d4cfc251d';

// Define the asynchronous function
async function apiFetch() {
    try {
        // Fetch the URL
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.7499&lon=6.6371&units=imperial&appid=11815ecc1b5f8df7e92e386d4cfc251d';
        const response = await fetch(url);

        // Check if the response is OK
        if (response.ok) {
            const data = await response.json(); // Parse the JSON data
            console.log(data); // Output the results to the console for testing
            displayResults(data); // Call the function to update the HTML
        } else {
            // If response is not OK, throw an error with the response text
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        // Catch and output any errors
        console.error('Error fetching the API:', error);
    }
}

// Function to capitalize each word in a string
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

/// Function to display the results
function displayResults(data) {
    const temp = data.main.temp; // Current temperature
    const weatherArray = data.weather; // Array of weather events

    currentTemp.textContent = Math.round(temp); // Update temperature with zero decimal points

    // Handle multiple weather events
    let descriptions = weatherArray.map(weather => {
        const description = capitalizeWords(weather.description); // Capitalize each word
        const icon = weather.icon; // Icon code
        return `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" /> ${description}`;
    });

    // Update the weather icon and description
    weatherIcon.outerHTML = descriptions.join('<br>'); // Replace with all events and line breaks
    captionDesc.textContent = descriptions.map(desc => desc.split(' ')[1]).join(', '); // Simple description update
}

// Call the function
apiFetch();