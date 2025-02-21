import dotenv from "dotenv";
import config from "config";

dotenv.config();

const ENVIRONMENT = config.get("ENVIRONMENT");
const connectionString4Atlas = process.env.ATLAS_STRING;
const localApi = process.env.LOCAL_API;

const api = ENVIRONMENT === "development" ? localApi : connectionString4Atlas;

async function fetchCards() {
    try {
        const res = await fetch(`${api}/cards`);
        const cards = await res.json();
        console.log(cards);

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
