import { generateAuthToken } from "../../auth/providers/jwt.js";
import { deleteCard, getUserCards } from "../../cards/models/cardAccessDataService.js";
import { createError } from "../../utils/errorHandlers.js";
import { handleCompare, handleHash } from "../helpers/bcrypt.js";
import User from "./mongodb/Users.js";
import mongoose from 'mongoose';
import config from 'config';
const DB = config.get("DB");

// User Login // 
const loginUser = async (email, password) => {
    if (DB === "MongoDB") {
        try {
            const userFromDB = await User.findOne({ email });
            if (!userFromDB) {
                throw new Error("Account Doesn't Exist, Please Register");
            };
            if (!handleCompare(password, userFromDB.password)) {
                throw new Error("Wrong Password - Please try again");
            };

            const token = generateAuthToken(userFromDB);
            return token;
        } catch (error) {
            return createError("Authentication", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Register User//
const registerUser = async (newUser) => {
    if (DB === "MongoDB") {
        try {
            const existingUser = await User.findOne({ email: newUser.email });
            if (existingUser) {
                const error = new Error("Email is already in use by another User");
                error.status = 400;
                throw error;
            };
            newUser.password = handleHash(newUser.password);
            let user = new User(newUser);
            user = await user.save();
            user = { name: user.name, email: user.email, _id: user._id };
            return user;
        } catch (error) {
            createError('Registration', error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Get User by ID //
const getOneUser = async (userId) => {
    if (DB === "MongoDB") {
        try {
            if (!mongoose.isValidObjectId(userId.toString())) {
                throw new Error("Invalid User ID Format");
            };
            userId = new mongoose.Types.ObjectId(userId);
            let user = await User.findById(userId);
            return user;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Get All Users // 
const getAllUsers = async () => {
    if (DB === "MongoDB") {
        try {
            let users = await User.find();
            return users;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Update User // 
const updateUser = async (userId, userInfo) => {
    if (DB === "MongoDB") {
        try {
            if (userInfo.email) {
            const existingUser = await User.findOne({ email: userInfo.email });
                if (existingUser && existingUser._id.toString() !== userId) {
                    throw new Error("Email is already in use by another Account");
                };
            }
            let updatedUser = await User.findByIdAndUpdate(userId, userInfo, { new: true });
            if (!updatedUser) {
                throw new Error("Error updating user.");
            }
            return updatedUser;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Patch User's Business Status // 
const updateBizStatus = async (user) => {
    if (DB === "MongoDB") {
        try {
            user.isBusiness = !user.isBusiness;
            await user.save();
            return user;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Delete User // 
const deleteUser = async (userInfo) => {
    if (DB === "MongoDB") {
        try {
            let deleteUserCards = await getUserCards(userInfo._id);
            if (deleteUserCards) {
                deleteUserCards.forEach(async (card) => {
                    await deleteCard(card);
                });
            };
            let user = await User.findByIdAndDelete(userInfo._id);
            return user;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};

export { loginUser, getOneUser, getAllUsers, registerUser, updateUser, updateBizStatus, deleteUser };