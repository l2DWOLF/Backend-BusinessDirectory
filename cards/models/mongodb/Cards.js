import mongoose from 'mongoose';
import { DEFAULT_VALIDATION, EMAIL_VALIDATION, PHONE_VALIDATION, URL_VALIDATION } from '../../../helpers/MongoDB/mongooseValidators.js';
import ImageSchema from "../../../helpers/MongoDB/ImageSchema.js";
import AddressSchema from '../../../helpers/MongoDB/AddressSchema.js';


const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024, 
    },
    phone: PHONE_VALIDATION,
    email: EMAIL_VALIDATION,
    web: URL_VALIDATION,
    image: ImageSchema, 
    address: AddressSchema,
    bizNumber: {
        type: Number,
        unique: true,
        required: true,
        min: 1000000,
        max: 9999999
    },
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
const Card = mongoose.model("card", cardSchema);
export default Card; 