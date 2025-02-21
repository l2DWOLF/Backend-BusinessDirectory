import Joi from 'joi';
import { addressJoiVali, emailJoiVali, imageJoiVali, nameJoiVali, passJoiVali, phoneJoiVali } from '../../../helpers/joi/joiValidators.js';

const handleJoiRegisterVali = (user) => {
    const schema = Joi.object({
        name: nameJoiVali, 
        phone: phoneJoiVali,
        email: emailJoiVali,
        password: passJoiVali,
        image: imageJoiVali,
        address: addressJoiVali,
        isBusiness: Joi.boolean().required(),
        isAdmin: Joi.boolean().allow("")
    });
    return schema.validate(user);
};
export default handleJoiRegisterVali;