import handleJoiLoginVali from "./joi/joiLoginValidation.js";
import handleJoiRegisterVali from "./joi/joiRegisterValidation.js";
import config from 'config';
import handleJoiUpdateVali from "./joi/joiUpdateValidation.js";

const validator = config.get("VALIDATOR");

const registrationValidator = (user) => {
    if (validator === "Joi") {
        const { error } = handleJoiRegisterVali(user);
        if (error) {
            return error.details[0].message;
        }
        return "";
    };
};

const loginValidator = (user) => {
    if (validator === "Joi") {
        const { error } = handleJoiLoginVali(user);
        if (error) {
            return error.details[0].message;
        }
        return "";
    };
};
const updateValidator = (user) => {
    if (validator === "Joi") {
        const { error } = handleJoiUpdateVali(user);
        if (error) {
            return error.details[0].message;
        }
        return "";
    };
};
export {registrationValidator, loginValidator, updateValidator}; 