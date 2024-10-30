// Function to update the visit counter
function updateVisitCount() {
    // Retrieve the visit counter from localStorage
    let visitCount = localStorage.getItem('visitCount');

    // If visitCount is null, initialize it to 1 ( first visit)
    if (visitCount === null) {
        visitCount = 1;
    } else {
        // Convert the retrieved value to a number and increment
        visitCount = parseInt(visitCount, 10) + 1;
    }

    // Update the display
    document.getElementById('visitCount').textContent = visitCount;

    // Store the updated visit count in localStorage
    localStorage.setItem('visitCount', visitCount);
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', updateVisitCount);
