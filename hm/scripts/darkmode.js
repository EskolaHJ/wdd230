const toggle = document.querySelector('.switch input');
const body = document.body;

// Check if dark mode preference is stored
if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
    toggle.checked = true;
}

toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
});
