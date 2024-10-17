const input = document.querySelector('#favchap');
const button = document.querySelector('button')
const list = document.querySelector('#list');


button.addEventListener('click', () => {
    // Check if the input is not empty
    if (input.value.trim() !== '') {
        //Create an li element
        const listItem = document.createElement('li');

        // Create a delete button
        const deletButton = document.createElement('button');

        // Set the li text to the input value
        listItem.textContent = input.value;

        // Set the delete button text to ❌
        deletButton.textContent = '❌';

        // Append the delte button to the li
        listItem.appendChild(deletButton);

        // Append the li to the list
        list.appendChild(listItem);

        //Add an event listener to the delete button that removes the li element when clicked
        deletButton.addEventListener('click', () => {
            list.removeChild(listItem);
            input.focus();
        });

        // Clear the imput field and set focus back to it
        input.value = '';
        input.focus();
    } else {
        // If input is empty, send focus back to the input field
        input.focus();
    }
});