// Declare references to the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Initialize chaptersArray and load chapters from localStorage
let chaptersArray = JSON.parse(localStorage.getItem('chapters')) || [];

// Load and render chapters on page load
window.addEventListener('load', renderChapters);

// Dark mode toggle button
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = 'Toggle Dark Mode';
document.querySelector('main').appendChild(darkModeToggle);

// Apply dark mode based on saved preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Event listener for adding chapters
button.addEventListener('click', () => {
    if (input.value.trim()) {
        chaptersArray.push({ chapter: input.value, notes: '' });
        updateLocalStorage();
        renderChapters();
        input.value = '';
    }
});

// Function to render all chapters
function renderChapters() {
    list.innerHTML = '';
    chaptersArray.forEach(displayChapter);
}

// Function to display a chapter in the list
function displayChapter(item) {
    const li = document.createElement('li');
    li.textContent = item.chapter;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.addEventListener('click', () => deleteChapter(item.chapter));

    li.appendChild(deleteButton);
    list.appendChild(li);
}

// Function to update localStorage
function updateLocalStorage() {
    localStorage.setItem('chapters', JSON.stringify(chaptersArray));
}

// Function to delete a chapter
function deleteChapter(chapter) {
    chaptersArray = chaptersArray.filter(item => item.chapter !== chapter);
    updateLocalStorage();
    renderChapters();
}

// CSS for Dark Mode
const style = document.createElement('style');
style.textContent = `
    .dark-mode {
        background-color: #121212;
        color: #ffffff;
    }
    .dark-mode button, .dark-mode li {
        background-color: #333333;
        color: #ffffff;
    }
    li {
        margin-bottom: 10px;
        padding: 5px;
        background-color: #f5f5f5;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);
