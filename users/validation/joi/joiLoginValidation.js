import Joi from 'joi';
import { emailJoiVali, passJoiVali } from '../../../helpers/joi/joiValidators.js';

const handleJoiLoginVali = (user) => {
    const schema = Joi.object({
        email: emailJoiVali,
        password: passJoiVali,
    });
    return schema.validate(user);
};
export default handleJoiLoginVali;