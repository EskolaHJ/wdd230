document.addEventListener("DOMContentLoaded", function() {
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const daysElapsed = Math.floor((currentVisit - lastVisitDate) / (1000 * 60 * 60 * 24));
        
        if (daysElapsed < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysElapsed === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysElapsed} days ago.`;
        }
    }
    localStorage.setItem("lastVisit", currentVisit.toString());
});
