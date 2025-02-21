import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const S_K = process.env.S_KEYWORD;

const generateAuthToken = (user) => {
    const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness
    };
    const token = jwt.sign(payload, S_K);
    return token;
};

const verifyToken = (tokenFromClient) => {
    try {         
        const payload = jwt.verify(tokenFromClient, S_K);
        return payload;
    } catch (error) {
        return null;
    }
};

export {generateAuthToken, verifyToken};