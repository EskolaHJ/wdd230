document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastUpdatedDate').textContent = new Date(document.lastModified).toLocaleDateString("en-US");

});

document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.querySelector('.hamburger');
    var nav = document.getElementById('main-navigation');

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('active'); // Toggle navigation visibility
        hamburger.classList.toggle('active'); // Toggle button appearance
    });
});