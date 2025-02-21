import mongoose from 'mongoose';
import { DEFAULT_VALIDATION, URL_VALIDATION } from './mongooseValidators.js';

const ImageSchema = new mongoose.Schema({
    url: URL_VALIDATION,
    alt: DEFAULT_VALIDATION
});
export default ImageSchema;