
// This event listener waits for the entire HTML document to load before running the code inside the function.
document.addEventListener('DOMContentLoaded', (event) => {
    
    // Once the document is fully loaded, this line finds the HTML element with the id 'year'
    // and updates its text content to display the current year (using JavaScript's Date object).
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // This line finds the HTML element with the id 'lastUpdatedDate'
    // and updates its text content to display the last modified date of the document.
    // It uses the 'document.lastModified' property and formats the date to "MM/DD/YYYY" format using toLocaleDateString.
    document.getElementById('lastUpdatedDate').textContent = new Date(document.lastModified).toLocaleDateString("en-US");
});