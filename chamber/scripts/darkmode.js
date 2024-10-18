document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.grid-container').classList.toggle('dark-mode');
        document.querySelector('.header').classList.toggle('dark-mode');
        document.querySelector('.footer').classList.toggle('dark-mode');

        // Toggle class for nav-links
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.classList.toggle('dark-mode');
        });

        // Toggle class for section elements
        document.querySelectorAll('section').forEach(section => {
            section.classList.toggle('dark-mode');
        });
    });
});