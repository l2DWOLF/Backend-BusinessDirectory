

const production = "https://backend-businessdirectory.onrender.com";

async function fetchCards() {
    try {
        const res = await fetch(`${production}/cards`);
        const cards = await res.json();

        const display = document.querySelector(".cards-display");
        cards.forEach((card) => {
            const cardDiv = document.createElement("div");
            cardDiv.style = "border:1px solid blue; padding: 12px; margin-bottom: 12px; text-align: left;";
            cardDiv.className = "card";

            for (const property in card) {
                if (["image", "address", "user_id", "__v"].includes(property)) continue;

                const cardP = document.createElement("p");
                cardP.style = "border-bottom:1px solid gray; padding: 4px;";
                cardP.innerHTML = `${property}: ${card[property]}`;
                cardDiv.appendChild(cardP);
            }
            display.appendChild(cardDiv);
        });
    } catch (error) {
        console.error("Homepage Error: ", error);
    }
}

fetchCards();