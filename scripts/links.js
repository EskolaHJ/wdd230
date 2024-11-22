const baseURL = "https://eskolahj.github.io/wdd230";

const linksURL = "https://eskolahj.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log(data); // Verify the data loads correctly

        // Pass the lessons array to the displayLinks function
        displayLinks(data.lessons); 
    } catch (error) {
        console.error("Error fetching links:", error);
    }
}

// Function to display the links
function displayLinks(lessons) {
    const learningActivities = document.querySelector("ul"); // Target the existing <ul> for learning activities

    // Loop through each lesson's data and add items
    lessons.forEach(lesson => {
        const weekItem = document.createElement("li");
        weekItem.textContent = `Lesson ${lesson.lesson}`; // Add lesson number as text

        lesson.links.forEach(link => {
            if (link.url && link.title) { // Check if link data is valid
                const linkElement = document.createElement("a");
                linkElement.href = `${baseURL}/${link.url}`;
                linkElement.textContent = link.title;
                linkElement.style.marginRight = "10px"; // Adds space between multiple links if present
                weekItem.appendChild(linkElement);
            }
        });

        learningActivities.appendChild(weekItem); // Append each new list item to the <ul>
    });
}

// Call the function to start the process
getLinks();
