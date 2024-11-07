// scripts/hamburger.js
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav ul'); // Select the <ul> element of the nav

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('show'); // Toggle the display of the navigation
        const isExpanded = nav.classList.contains('show');
        hamburger.setAttribute('aria-expanded', isExpanded); // Update aria-expanded attribute
        hamburger.classList.toggle('open'); // Toggle the open class for changing icon
    });
});
