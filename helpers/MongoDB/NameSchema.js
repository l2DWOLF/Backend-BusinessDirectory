import mongoose from 'mongoose';
import { DEFAULT_VALIDATION, DEFAULT_VALIDATION_REQ } from './mongooseValidators.js';

const NameSchema = new mongoose.Schema({
    first: DEFAULT_VALIDATION_REQ,
    middle: DEFAULT_VALIDATION,
    last: DEFAULT_VALIDATION_REQ
});
export default NameSchema; 