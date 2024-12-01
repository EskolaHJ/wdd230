// js/rentals.js

document.addEventListener("DOMContentLoaded", () => {
    const rentalsContainer = document.getElementById("rentals-container");

    // Fetch data from the JSON file
    fetch("data/prices.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error fetching rental data.");
            }
            return response.json();
        })
        .then((data) => {
            displayRentals(data.rentals);
        })
        .catch((error) => {
            rentalsContainer.innerHTML = `<p class="error">Unable to load rental information. Please try again later.</p>`;
            console.error("Error:", error);
        });

    // Function to display rentals dynamically
    function displayRentals(rentals) {
        rentals.forEach((rental) => {
            const rentalCard = document.createElement("div");
            rentalCard.className = "rental-card";
            rentalCard.setAttribute("role", "article");

            rentalCard.innerHTML = `
                <img src="${rental.image}" alt="${rental.type}" class="rental-image">
                <h3>${rental.type}</h3>
                <p><strong>Category:</strong> ${rental.category}</p>
                <p>${rental.description}</p>
                <ul>
                    ${rental.features.map((feature) => `<li>${feature}</li>`).join("")}
                </ul>
                <table class="rental-pricing">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Half Day</th>
                            <th>Full Day</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Reservation</td>
                            <td>$${rental.reservation.halfDay}</td>
                            <td>$${rental.reservation.fullDay}</td>
                        </tr>
                        <tr>
                            <td>Walk-In</td>
                            <td>$${rental.walkIn.halfDay}</td>
                            <td>$${rental.walkIn.fullDay}</td>
                        </tr>
                    </tbody>
                </table>
            `;

            rentalsContainer.appendChild(rentalCard);
        });
    }
});
