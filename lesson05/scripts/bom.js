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

// Load chapters from LocalStorage when the page loads
window.addEventListener('load', () => {
    const savedChapters = JSON.parse(localStorage.getItem('chapters')) || [];
    savedChapters.forEach(chapterData => addChapterToList(chapterData.chapter, chapterData.notes));
});

// Event listener for adding chapters to the list
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        addChapterToList(input.value, ''); // Add the chapter to the list with an empty note
        saveChapters(); // Save the updated list to localStorage
        input.value = ''; // Clear the input field
        input.focus(); // Focus back on the input field
    } else {
        input.focus(); // Focus on the input field if empty
    }
});

// Event listener for saving notes
saveNotesButton.addEventListener('click', () => {
    if (selectedChapter) {
        selectedChapter.dataset.notes = notesInput.value; // Save the notes to the dataset of the selected chapter
        saveChapters(); // Save the updated chapters and notes to localStorage
    }
});

// Event listener for sorting chapters
sortButton.addEventListener('click', () => {
    const listItems = Array.from(list.querySelectorAll('li'));
    listItems.sort((a, b) => a.firstChild.textContent.localeCompare(b.firstChild.textContent));
    list.innerHTML = '';
    listItems.forEach(item => list.appendChild(item));
    saveChapters(); // Save the updated list to localStorage
});

// Function to add a chapter to the list
function addChapterToList(chapter, notes) {
    // Create an li element
    const listItem = document.createElement('li');
    listItem.textContent = chapter;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';

    // Append the delete button to the li
    listItem.appendChild(deleteButton);

    // Append the li to the list
    list.appendChild(listItem);

    // Set notes data if available
    listItem.dataset.notes = notes;

    // Add an event listener to the delete button that removes the li element when clicked
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from selecting the chapter
        list.removeChild(listItem);
        saveChapters(); // Save changes to localStorage
    });

    // Add an event listener to the list item for selecting and editing notes
    listItem.addEventListener('click', () => {
        selectedChapter = listItem; // Set the selected chapter
        notesInput.value = listItem.dataset.notes; // Load the notes for the selected chapter into the textarea
    });
}

// Function to save the current chapters and their notes to localStorage
function saveChapters() {
    const chapters = Array.from(list.querySelectorAll('li')).map(li => {
        return {
            chapter: li.firstChild.textContent, // The text of the chapter
            notes: li.dataset.notes || '' // The notes for the chapter, defaulting to an empty string
        };
    });
    localStorage.setItem('chapters', JSON.stringify(chapters)); // Save the chapters array to localStorage
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
