const baseURL = "https://eskolahj.github.io/wdd230";

const linksURL = "https://eskolahj.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    console.log(data); // Verify the data loads correctly

    displayLinks(data); // Call displayLinks with the JSON data
}

// Function to display the links
function displayLinks(weeks) {
    const learningActivities = document.querySelector("ul"); // Target the existing <ul> for learning activities

    // Loop through each week's data and add items
    weeks.forEach(week => {
        const weekItem = document.createElement("li");
        weekItem.textContent = `${week.lesson}`; // Add lesson number as text

        week.links.forEach(link => {
            const linkElement = document.createElement("a");
            linkElement.href = `${baseURL}/${link.url}`;
            linkElement.textContent = link.title;
            linkElement.style.marginRight = "10px"; // Adds space between multiple links if present
            weekItem.appendChild(linkElement);
        });

        learningActivities.appendChild(weekItem); // Append each new list item to the <ul>
    })
}

getLinks(); // Start the process