import chalk from 'chalk';

const createError = (validator, error) => {
    error.message = `${validator} Error:\nDetails: ${error.message}.`;
    error.status = error.status || 400;
    throw error;
};

const handleError = (res, status, message = "") => {
    console.error(chalk.white.bgHex('#CF4000').bold(`Error Details: ${message}.`));
    res.customMessage = message;
    return res.status(status).send(`[Error Details]: ${message}`);
};

export { createError, handleError };