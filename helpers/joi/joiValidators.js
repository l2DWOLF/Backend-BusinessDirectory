import Joi from 'joi';

const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const defaultJoiValiReq = Joi.string().required().min(2).max(256);
const defaultJoiVali = Joi.string().max(256).allow("");

const urlJoiVali = Joi.string().min(14).max(512).ruleset.regex(urlRegex).rule({ message: "Invalid URL Address" }).allow("");

const passJoiVali = Joi.string().required().min(8).max(20).ruleset.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){4,})(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,20}$/).rule({message:  'Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*-'});

const phoneJoiVali = Joi.string().required().min(9).max(11)
    .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({ message: "Invalid Phone Number, International Numbers - Add 0 to the beginning of your area code" });

const emailJoiVali = Joi.string().required().min(5).max(256)
    .ruleset.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).rule({ message: "Invalid Email Address" });

const nameJoiVali = Joi.object().keys({
            first: defaultJoiValiReq,
            middle: defaultJoiVali,
            last: defaultJoiValiReq
}).required();

const addressJoiVali = Joi.object().keys({
    houseNumber: Joi.number().required().min(1).max(99999),
    street: defaultJoiValiReq,
    city: defaultJoiValiReq,
    state: Joi.string().min(2).max(256).allow(""),
    country: defaultJoiValiReq,
    zip: Joi.number().required().min(1).max(999999)
}).required();

const imageJoiVali = Joi.object().keys({
    url: Joi.string().min(14).max(512).ruleset.regex(urlRegex).rule({ message: "Invalid Image URL Address" }).allow(""),
    alt: Joi.string().min(2).max(256).allow("")
}).required();

export {defaultJoiValiReq, urlJoiVali, passJoiVali, phoneJoiVali, emailJoiVali, nameJoiVali, addressJoiVali, imageJoiVali};