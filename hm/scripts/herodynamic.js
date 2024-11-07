document.addEventListener('DOMContentLoaded', function () {
    function updateHomeTitle() {
        const titleElement = document.getElementById('home-title');
        const screenWidth = window.innerWidth;

        if (screenWidth < 600) {
            titleElement.textContent = "Welcome";
        } else if (screenWidth >= 600 && screenWidth < 850) {
            titleElement.textContent = "Welcome";
        } else {
            titleElement.textContent = "Welcome";
     }
}

// Initial call to set the title based on the initial size
updateHomeTitle();

// Event listener to update on resize
window.addEventListener('resize', updateHomeTitle);
});