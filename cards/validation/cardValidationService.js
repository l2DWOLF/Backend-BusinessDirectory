import handleJoiCardVali from "./joi/joiCardValidation.js";
import config from 'config';
const validator = config.get("VALIDATOR");

const cardValidator = (card) => {
    if(validator === "Joi"){
        const {error} = handleJoiCardVali(card);
        if(error){
            return error.details[0].message;
        }
    return ""; 
    };
};
export default cardValidator; 