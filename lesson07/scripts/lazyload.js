document.getElementById('last-modified').textContent = document.lastModified;

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.add("fade-in"); // Apply fade-in class to trigger opacity transition
                    observer.unobserve(image);
                }
            });
        });

        images.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        images.forEach(image => {
            image.src = image.dataset.src;
            image.classList.add("fade-in");
        });
    }
});
