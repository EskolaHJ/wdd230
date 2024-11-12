const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

// Define an asynchronous function named getProphetData
async function getProphetData() {
    // Await the fetch of the URL and store the response object
    const response = await fetch(url);
    // Await the parsing of the response body as JSON and store the result
    const data = await response.json();

    // Use console.table() to check the data response in the console window
    console.table(data.prophets);

    // Call the displayProphets function with the prophets data from the JSON
    displayProphets(data.prophets);
}

// Call the function getProphetData() to test the fetch and response
getProphetData(url);

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create a section element and store it in a variable named 'card
        let card = document.createElement('section');
        // Create an h2 element and store it in a variable named 'fullName'
        let fullName = document.createElement('h2');
        // Create an img element and store it in a variable named 'portrait'
        let portrait = document.createElement('img');

        // Populate the heading element with the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Build the image element by setting its attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340'); 
        portrait.setAttribute('height', '440');

        // Append the heading and image elements to the card
        card.appendChild(fullName);
        card.appendChild(portrait);

        // Finally, add the card to the 'cards' div
        cards.appendChild(card);
    })
    
}