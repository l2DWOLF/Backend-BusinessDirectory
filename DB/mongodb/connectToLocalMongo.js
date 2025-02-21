import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();
const api = process.env.LOCAL_API;

export const connectToLocalMongo = async () => {
    try {
        await mongoose.connect(api);
        console.log(chalk.bgHex('#125125125').bold.cyan(" Connection to Local MongoDB Established Successfully. "));
    } catch (error) {
        console.error(chalk.bgWhite.red.bold("Failed to connect to MongoDB Locally, Error: \n" + error));
    };
};