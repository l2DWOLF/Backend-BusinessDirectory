const URL_VALIDATION = {
    type: String,
    required: false,
    default: '',
    trim: true,
    lowercase: true,
    maxLength: 512,
    match: RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    ),
};

const EMAIL_VALIDATION = {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 5,
    maxLength: 256,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
};

const PHONE_VALIDATION = {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 11,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
}

const DEFAULT_VALIDATION = {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    maxLength: 256
};

const DEFAULT_VALIDATION_REQ = {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    minLength: 2,
    maxLength: 256
}; 

export { URL_VALIDATION, EMAIL_VALIDATION, PHONE_VALIDATION, DEFAULT_VALIDATION, DEFAULT_VALIDATION_REQ };