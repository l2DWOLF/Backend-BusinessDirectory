
import mongoose from 'mongoose';
import { DEFAULT_VALIDATION, DEFAULT_VALIDATION_REQ } from './mongooseValidators.js';

const AddressSchema = new mongoose.Schema({
        houseNumber: {
            type: Number,
            required: true,
            trim: true,
            min: 1,
            max: 99999
        },
        street: DEFAULT_VALIDATION_REQ,
        city: DEFAULT_VALIDATION_REQ,
        state: DEFAULT_VALIDATION,
        country: DEFAULT_VALIDATION_REQ,
        zip: {
            type: Number,
            required: true,
            trim: true,
            min: 1,
        },
});
export default AddressSchema; 