document.addEventListener('DOMContentLoaded', function () {

    //Windchill calculations for weather 
    function calculateWindChill() {
        // Extract temperature and wind speed values from the HTML
        const temperature = parseFloat(document.getElementById('temperature').textContent);
        const windspeed = parseFloat(document.getElementById('windspeed').textContent);
        const windChillElement = document.getElementById('windchill');

        // Check if the values meet the specification limits
        if (temperature <= 50 && windspeed > 3.0) {
            // Calculate wind chill using the formula: Twc = 35.74 + 0.6215Ta - 35.75v^0.16 + 0.4275Tav^0.16
            const windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windspeed, 0.16)) + (0.4275 * temperature * Math.pow(windspeed, 0.16));
            windChillElement.textContent = windChill.toFixed(2) + " °F"; // Display the calculated wind chill
        } else {
            windChillElement.textContent = "N/A"; // Not applicable
        }
    }

    // Call the function to calculate wind chill
    calculateWindChill();

});
