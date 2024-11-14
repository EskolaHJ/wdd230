document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");

    // Fetch JSON data and populate directory
    fetch("data/members.json")
        .then(response => response.json())
        .then(members => {
            members.forEach(member => {
                const memberElement = document.createElement("div");
                memberElement.classList.add("member-card");
                memberElement.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                directory.appendChild(memberElement);
            });
        });

    // Toggle between grid and list view
    gridViewButton.addEventListener("click", () => {
        directory.classList.add("grid-view");
        directory.classList.remove("list-view");
    });
    listViewButton.addEventListener("click", () => {
        directory.classList.add("list-view");
        directory.classList.remove("grid-view");
    });
});
