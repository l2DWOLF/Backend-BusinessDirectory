import dexter from 'morgan';
import chalk from 'chalk';
import timeStamper from "../../utils/timeHelper.js";
import localLogger from './localLogger.js';

let isLogging = false;
const morganLogger = dexter(function (tokens, req, res) {
    const timeStamp = timeStamper();
    let message = [
        ` [${timeStamp.month}/${timeStamp.day}/${timeStamp.year} | ${timeStamp.hours}:${timeStamp.minutes}:${timeStamp.seconds}]: `,
        ` \n[${chalk.bgGreen(" Method: ")}${chalk.bgMagentaBright.bold(` ${tokens.method(req, res)} `)}]`,
        ` [${chalk.bgGreen(" URL: ")}${chalk.bgCyanBright.bold(`"${tokens.url(req, res)}"`)}]`,
        ` [${chalk.bgGreen(" Status: ")}${chalk.bgMagentaBright.bold(` ${tokens.status(req, res)} `)}]`,
        ` [${chalk.bgGreen(" Response: ")}${chalk.bgBlueBright.bold(` ${tokens.res(req, res, 'content-length')} `)}]`,
        ` [${chalk.bgHex('#CF500')(" Response Time:")}${chalk.bgCyanBright(` ${tokens['response-time'](req, res)} ms.`)}]. `
    ].join('');

    if (res.statusCode >= 400) {
        const errorDetails = {
            errorMessage: res.statusMessage || 'No error message',
            customMesssage: res.customMessage || "No Additional Details",
            stackTrace: res.locals?.error?.stack || 'No stack trace available'
        };
        if (!isLogging) {
            isLogging = true;
            const logit = async () => {
                try {
                    await localLogger(tokens, req, res, errorDetails);
                } catch (error) {
                    console.log("Error logging to file:", error);
                } finally {
                    isLogging = false; // Release lock after logging
                }
            };
            logit();
        };
        return chalk.redBright.bold(`FAILED REQUEST @${message}.`);
    } else {
        return chalk.cyanBright.bold(`REQUEST @${message}`);
    };
});

export default morganLogger;