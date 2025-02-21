import { connectToAtlasDB } from "./mongodb/connectToAtlas.js";
import { connectToLocalMongo } from "./mongodb/connectToLocalMongo.js";
import { seedInitialUsers, seedInitialCards } from "./seeding/initialLocalData.js";
import confirg from 'config';

const ENVIRONMENT = confirg.get("ENVIRONMENT");

export const connectToDB = async () => {
    try {
        if (ENVIRONMENT === "development") {
            await connectToLocalMongo();
            await seedInitialUsers();
            await seedInitialCards();
        }
        else if (ENVIRONMENT === "production") {
            await connectToAtlasDB();
            await seedInitialUsers();
            await seedInitialCards();
        }
        else{
            let error = new Error('Enviroment Type Invalid')
            error.status = 400;
            throw error; 
        };
    } catch (error) {
        throw error;
    };
};