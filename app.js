import express from 'express';
import chalk from 'chalk';
import { connectToDB } from './DB/dbService.js';
import router from './mainRouter/router.js';
import corsMiddleware from './middlewares/cors.js';
import { createError, handleError } from './utils/errorHandlers.js';
import loggerMiddleware from './logger/loggerService.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8181;
app.use(express.static("./public"));
app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware());
app.use(router);

app.use((err, req, res, next) => {
    const message = err || "Internal Server Error";
    return handleError(res, 500, message);
});

// Server Listen // 
app.listen(PORT, async () => {
    console.log(chalk.bgHex('#125125125').bold.cyanBright(" Server is listening to Port " + PORT+". "));
    try {
        await connectToDB();
    } catch (error) {
        createError("DB Connection Failure: ", error);
        process.exit(1);
    };
});
