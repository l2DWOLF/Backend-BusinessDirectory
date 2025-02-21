import normalizeUser from "../../users/helpers/normalizeUser.js";
import User from "../../users/models/mongodb/Users.js";
import { registerUser } from "../../users/models/userAccessDataService.js";
import chalk from 'chalk';
import { createError } from "../../utils/errorHandlers.js";
import Card from "../../cards/models/mongodb/Cards.js";
import normalizeCard from "../../cards/helpers/normalize.js";
import { createCard } from "../../cards/models/cardAccessDataService.js";

const initialUsers = [
    {
        "name": {
            "first": "Regular",
            "middle": "1st",
            "last": "Dude"
        },
        "phone": "0501119999",
        "email": "regular@dude.com",
        "password": "Password1234!",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "houseNumber": 560,
            "street": "West 43rd Street",
            "city": "New York",
            "state": "NY",
            "country": "USA",
            "zip": 10036
        },
        "isBusiness": false
    },
    {
        "name": {
            "first": "Business",
            "middle": "2nd",
            "last": "Dude"
        },
        "phone": "0501119999",
        "email": "business@dude.com",
        "password": "Password1234!",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "houseNumber": 520,
            "street": "West 43rd Street",
            "city": "New York",
            "state": "NY",
            "country": "USA",
            "zip": 10036
        },
        "isBusiness": true
    },
    {
        "name": {
            "first": "Admin",
            "middle": "3rd",
            "last": "Dude"
        },
        "phone": "0501119999",
        "email": "admin@dude.com",
        "password": "Password1234!",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "houseNumber": 535,
            "street": "West 43rd Street",
            "city": "New York",
            "state": "NY",
            "country": "USA",
            "zip": 10036
        },
        "isBusiness": true,
        "isAdmin": true
    },
];

const initialCards = [
    {   
        "user_id": "000000000000000000000000",
        "title": "Henry Hall",
        "subtitle": "Sample Card 1",
        "description": "Henry Hall is redefining NYC luxury to create spaces that are designed for both relaxation and socializing, with amenities that suit every lifestyle. 24/7 Doorman, W/D in Unit, Recording Studio, Resident's Lounge & Bar.",
        "phone": "0917552525",
        "email": "reception@henryhall.com",
        "web": "www.henryhallnyc.com",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "houseNumber": 515,
            "street": "West 38th Street",
            "city": "New York",
            "state": "NY",
            "country": "USA",
            "zip": 10037
        }
    },
    {   
        "user_id": "000000000000000000000000",
        "title": "Riverbank",
        "subtitle": "Sample Card 2",
        "description": "These luxury apartments are everything a home should be, with an outstanding level of finishes and workmanship. 24/7 doorman, balcony, w/d in unit, indoor pool, billiards, work-stations, grilling stations, etc..",
        "phone": "0917552525",
        "email": "reception@riverbank.com",
        "web": "www.riverbankny.com/",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "houseNumber": 560,
            "street": "West 43rd Street",
            "city": "New York",
            "state": "NY",
            "country": "USA",
            "zip": 10038
        }
    },
    {   
        "user_id": "000000000000000000000000",
        "title": "The Landon",
        "subtitle": "Sample Card 3",
        "description": "The Landon has the location advantage of it all, without a perk or premium spared. Featuring luxurious, oversized apartments, a modern fitness center, a children's play area, valet parking, Zipcars on site, a resident's lounge and a jaw-dropping rooftop, The Landon sets itself apart from the rest, in every domain.",
        "phone": "0917552525",
        "email": "reception@landon.com",
        "web": "www.riverbankny.com/",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "houseNumber": 520,
            "street": "West 43rd Street",
            "city": "New York",
            "state": "NY",
            "country": "USA",
            "zip": 10038
        }
    },
];

const seedInitialUsers = async () => {
    try {
        const users = await User.find();
        if (users.length < 3) {
            let count = 0;
            for (let user of initialUsers) {
                const isUserInDB = users.some((dbUser) => dbUser.email.toString() === user.email.toString());
                if (!isUserInDB) {
                    user = await normalizeUser(user);
                    await registerUser(user);
                    count++;
                };
            };
            console.log(chalk.bgCyan.bold.white(` ${count} Initial Users Seeded Successfully. `));
        };
    } catch (error) {
        createError("Users Seeding Error", error) 
    }; 
    return true;
};  
const seedInitialCards = async () => {
    try {
        const cards = await Card.find();
        if (cards.length < 3) {
            let count = 0;
            for (let card of initialCards) {
                const isCardInDB = cards.some((dbCard) => dbCard.email === card.email);
                if (!isCardInDB) {
                    card = await normalizeCard(card);
                    await createCard(card);
                    count++;
                };
            };
            console.log(chalk.bgCyan.bold.white(` ${count} Initial Cards Seeded Successfully. `));
        };
    } catch (error) {
        createError("Cards Seeding Error", error) 
    }; 
    return true;
};
export {seedInitialUsers, seedInitialCards}; 