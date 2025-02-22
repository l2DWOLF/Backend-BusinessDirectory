import mongoose from 'mongoose';
import { EMAIL_VALIDATION, PHONE_VALIDATION } from '../../../helpers/MongoDB/mongooseValidators.js';
import NameSchema from '../../../helpers/MongoDB/NameSchema.js';
import ImageSchema from '../../../helpers/MongoDB/ImageSchema.js';
import AddressSchema from '../../../helpers/MongoDB/AddressSchema.js';

const userSchema = new mongoose.Schema({
    name: NameSchema,
    phone: PHONE_VALIDATION,
    email: EMAIL_VALIDATION,
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 128
    },
    image: ImageSchema,
    address: AddressSchema,
    isBusiness: { type: Boolean, required: true },
    isAdmin: { type: Boolean, required: true},
    createdAt: {
        type: Date, 
        default: Date.now
    },
    loginAttempts: {
        attempts: {type: Number, default: 0},
        blockLogin: {type: Boolean, default: false},
        blockUntil: { type: Date, default: null }
    }
});
const User = mongoose.model("user", userSchema);
export default User; 