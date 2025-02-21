import Joi from 'joi';
import { addressJoiVali, defaultJoiValiReq, emailJoiVali, imageJoiVali, phoneJoiVali, urlJoiVali } from '../../../helpers/joi/joiValidators.js';

const handleJoiCardVali = (card) => {
    const schema = Joi.object({
        title: defaultJoiValiReq,
        subtitle: defaultJoiValiReq,
        description: defaultJoiValiReq,
        phone: phoneJoiVali,
        email: emailJoiVali,
        web: urlJoiVali,
        image: imageJoiVali,
        address: addressJoiVali,
    });
    return schema.validate(card);
};
export default handleJoiCardVali;