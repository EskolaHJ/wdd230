// Declare references to the input, button, and list elements
const input = document.querySelector('#favchap'); // Reference to input element for chapter
const button = document.querySelector('button'); // Reference to "Add Chapter" button
const list = document.querySelector('#list'); // Reference to the list element

// Create and insert the sort button
const sortButton = document.createElement('button'); // Create a button for sorting chapters
sortButton.textContent = 'Sort Chapters'; // Set the text of the sort button
document.querySelector('main').appendChild(sortButton); // Append the sort button to the main element

// Create a notes section element
const notesSection = document.createElement('div'); // Create a div for the notes section
const notesTitle = document.createElement('h2'); // Create a heading for the notes section
notesTitle.textContent = 'Notes'; // Set the heading text
const notesInput = document.createElement('textarea'); // Create a textarea for notes
notesInput.placeholder = 'Select a chapter to add notes... '; // Set placeholder for the notes
const saveNotesButton = document.createElement('button'); // Create a button to save notes
saveNotesButton.textContent = 'Save Notes'; // Set the button text
notesSection.appendChild(notesTitle); // Append the heading to the notes section
notesSection.appendChild(notesInput); // Append the notes input to the notes section
notesSection.appendChild(saveNotesButton); // Append the save button to the notes section
document.querySelector('main').appendChild(notesSection); // Append the notes section to the main element

let selectedChapter = null; // Variable to keep track of the selected chapter

// Create a dark mode toggle button
const darkModeToggle = document.createElement('button'); // Create a button for dark mode toggle
darkModeToggle.textContent = 'Toggle Dark Mode'; // Set button text
document.querySelector('main').appendChild(darkModeToggle); // Append the button to the main element

// Apply dark mode based on user preference
const currentTheme = localStorage.getItem('theme'); // Get the saved theme from localStorage
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode'); // Apply dark mode if saved theme is 'dark'
}

// Event listener for dark mode toggle button
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Toggle the 'dark-mode' class on the body

    // Save the user's theme preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark'); // Save 'dark' theme in localStorage
    } else {
        localStorage.setItem('theme', 'light'); // Save 'light' theme in localStorage
    }
});

// Initialize chaptersArray and load chapters from LocalStorage when the page loads
let chaptersArray = getChapterList() || [];

window.addEventListener('load', () => {
    renderChapters(); // Load and render all chapters
});

// Event listener for adding chapters to the list
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        const newChapter = { chapter: input.value, notes: '' };
        chaptersArray.push(newChapter); // Add to array
        setChapterList(); // Update localStorage
        renderChapters(); // Re-render updated list
        input.value = ''; // Clear the input field
        input.focus(); // Focus back on the input field
    } else {
        input.focus(); // Focus on the input field if empty
    }
});

// Event listener for saving notes
saveNotesButton.addEventListener('click', () => {
    if (selectedChapter) {
        const chapterName = selectedChapter.textContent.slice(0, -1); // Exclude delete icon
        const updatedNotes = notesInput.value;
        
        // Update `chaptersArray` with the new notes
        chaptersArray.forEach(item => {
            if (item.chapter === chapterName) {
                item.notes = updatedNotes;
            }
        });

        setChapterList(); // Save the updated chapters and notes to localStorage
        renderChapters(); // Re-render chapters to show the updated notes
    }
});

// Event listener for sorting chapters
sortButton.addEventListener('click', () => {
    chaptersArray.sort((a, b) => a.chapter.localeCompare(b.chapter));
    setChapterList(); // Save sorted list to localStorage
    renderChapters(); // Re-render sorted list
});

// Function to render all chapters
function renderChapters() {
    list.innerHTML = ''; // Clear the list
    chaptersArray.forEach(displayList); // Render each chapter
}

// Function to display a chapter in the list
function displayList(item) {
    const li = document.createElement('li');
    li.textContent = item.chapter;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    li.appendChild(deleteButton);
    list.appendChild(li);
    li.dataset.notes = item.notes; // Set notes on display

    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from selecting the chapter
        deleteChapter(item.chapter);
    });

    li.addEventListener('click', () => {
        selectedChapter = li; // Set the selected chapter
        notesInput.value = li.dataset.notes; // Load the notes from the selected chapter into the textarea
    });
}

// Function to retrieve chapters from localStorage
function getChapterList() {
    const storedChapters = localStorage.getItem('chapters');
    return storedChapters ? JSON.parse(storedChapters) : null;
}

// Function to save chapters to localStorage
function setChapterList() {
    localStorage.setItem('chapters', JSON.stringify(chaptersArray));
}

// Function to delete a chapter from the list and localStorage
function deleteChapter(chapter) {
    chaptersArray = chaptersArray.filter(item => item.chapter !== chapter); // Remove chapter from array
    setChapterList(); // Update localStorage
    renderChapters(); // Re-render updated list
}

// CSS for Dark Mode and Improved Visibility
const style = document.createElement('style');
style.textContent = `
    .dark-mode {
        background-color: #121212;
        color: #ffffff;
    }
    .dark-mode button {
        background-color: #333333;
        color: #ffffff;
    }
    .dark-mode textarea {
        background-color: #333333;
        color: #ffffff;
        border: 1px solid #555555;
    }
    .dark-mode li {
        color: #ffffff; /* Make list items visible in dark mode */
    }
    li {
        margin-bottom: 10px; /* Add some space between list items */
        padding: 5px;
        background-color: #f5f5f5;
        border-radius: 5px;
    }
    .dark-mode li {
        background-color: #333333;
    }
`;
document.head.appendChild(style);
