import morganLogger from "./loggers/morganDexter.js";
import config from 'config';

const logger = config.get("LOGGER");

const loggerMiddleware = () => {
    if(logger === "morgan"){
        return morganLogger;
    };
};
export default loggerMiddleware;