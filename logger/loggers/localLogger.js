import fs from 'fs';
import path from 'path';
import timeStamper from "../../utils/timeHelper.js";
import chalk from 'chalk';

let isWriting = false;

const localLogger = async (tokens, req, res, logData) => {
    const timeStamp = timeStamper();
    const createdAt = `[${timeStamp.month}/${timeStamp.day}/${timeStamp.year} | ${timeStamp.hours}:${timeStamp.minutes}:${timeStamp.seconds}]: `;

    let message = {
        time: createdAt,
        method: `[Method]: ${tokens.method(req, res)}`,
        url: `[URL]: ${tokens.url(req, res)}`,
        status: `[Status]: ${tokens.status(req, res)}`,
        response: `[Response]: ${tokens.res(req, res, 'content-length')}`,
        responseTime: `[Response Time]: ${tokens['response-time'](req, res)} ms.`
    };

    if (logData && logData.errorMessage) {
        message.errorMessage = logData.errorMessage;
        message.customMesssage = res.customMessage;
    };
    if (logData && logData.stackTrace !== "No stack trace available") {
        message.stackTrace = logData.stackTrace;
    };

    const fileName = `${timeStamp.month}-${timeStamp.day}-${timeStamp.year}-Errors-log.json`;
    const filePath = path.join('./local-logs', fileName);

    if (isWriting) {
        setTimeout(() => localLogger(tokens, req, res, logData), 500);
        return;
    }

    try {
        isWriting = true;
        await fs.promises.mkdir(path.join('./local-logs'), { recursive: true });
        let logs = [];
        try {
            const data = await fs.promises.readFile(filePath, 'utf8');

            if (data.trim()) {
                try {
                    logs = JSON.parse(data);
                } catch (error) {
                    console.log("Invalid JSON in log file, resetting logs.");
                    logs = [];
                }
            }
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.log("Error reading the file:", err);
            }
        };

        logs.push(message); 
        await fs.promises.writeFile(filePath, JSON.stringify(logs, null, 2));
        console.log(chalk.bgWhite.blue.bold("Error logged to file successfully."));
    } catch (err) {
        console.log("Error with file operations:", err);
    } finally {
        isWriting = false;
    };
};

export default localLogger;