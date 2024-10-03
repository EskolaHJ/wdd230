const hamburger = document.getElementById('hamburger');
const navigation = document.getElementById('main-navigation');

hamburger.addEventListener('click', () => {
    navigation.classList.toggle('active'); // Toggle the 'active' class to show/hide the nav
    hamburger.textContent = navigation.classList.contains('active') ? 'X' : '☰'; // Change icon between 'X' and '☰'
})