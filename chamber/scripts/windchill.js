function calculateWindChill(temp, windSpeed) {
    if (temp <= 50 && windSpeed > 3.0) {
        let windChill = 25.74 + (0.6215 * temp) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temp * Math.pow(windSpeed, 0.16));
        return windChill.toFixed(1) + "°F";
    } else {
        return "N/A";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const temp = parseFloat(document.querySelector("#temperature").textContent);
    const windSpeed = parseFloat(document.querySelector("#windSpeed").textContent);
    const windChillDisplay = document.querySelector("#windChill");
    windChillDisplay.textContent = calculateWindChill(temp, windSpeed);
});