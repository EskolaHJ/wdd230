// Show the banner only on Monday, Tuesday, and Wednesday
const banner = document.getElementById("banner");
const closeBanner = document.getElementById("close-banner");

const today = new Date().getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

if (today >= 1 && today <= 3) {
    banner.classList.remove("hidden"); // Show the banner
}

closeBanner.addEventListener("click", () => {
    banner.classList.add("hidden"); // Hide the banner on close
});
