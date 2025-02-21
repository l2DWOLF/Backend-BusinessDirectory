import Joi from 'joi';
import { addressJoiVali, emailJoiVali, imageJoiVali, nameJoiVali, phoneJoiVali } from '../../../helpers/joi/joiValidators.js';

const handleJoiUpdateVali = (user) => {
    const schema = Joi.object({
        name: nameJoiVali,
        phone: phoneJoiVali,
        email: emailJoiVali,
        image: imageJoiVali,
        address: addressJoiVali,
        isBusiness: Joi.boolean().required(),
        isAdmin: Joi.boolean().allow("")
    });
    return schema.validate(user);
};
export default handleJoiUpdateVali;