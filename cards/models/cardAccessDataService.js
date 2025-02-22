import { createError } from "../../utils/errorHandlers.js";
import Card from "./mongodb/Cards.js";
import mongoose from 'mongoose';
import config from 'config';
const DB = config.get("DB");

// Get All Cards //
const getAllCards = async () => {
    if (DB === "MongoDB") {
        try {
            let cards = await Card.find();
            return cards;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Get One Card // 
const getOneCard = async (cardId) => {
    if (DB === "MongoDB") {
        try {
            if (!mongoose.isValidObjectId(cardId)) {
                throw new Error("Invalid Card ID Format.")
            };
            cardId = new mongoose.Types.ObjectId(cardId);
            let card = await Card.findById(cardId);
            return card;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Get All User Cards // 
const getUserCards = async (userId) => {
    if (DB === "MongoDB") {
        try {
            let userCards = await Card.find({ user_id: userId });
            return userCards;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Create New Card //
const createCard = async (newCard) => {
    if (DB === "MongoDB") {
        try {
            if (newCard.email) {
                const existingCard = await Card.findOne({ email: newCard.email });
                if (existingCard && existingCard._id.toString() !== newCard._id) {
                    throw new Error("Email is already in use by another Business Card");
                };
            };
            let card = new Card(newCard);
            card = await card.save();
            return card;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Update / Edit Card // 
const updateCard = async (cardId, cardInfo) => {
    if (DB === "MongoDB") {
        try {
            if (cardInfo.email) {
                const existingCard = await Card.findOne({ email: cardInfo.email });
                if (existingCard && existingCard._id.toString() !== cardId) {
                    throw new Error("Email is already in use by another Business Card");
                };
            };
            let updatedCard = await Card.findByIdAndUpdate(cardId, cardInfo, { new: true });
            if (!updatedCard) {
                throw new Error("Error updating card.");
            }
            return updatedCard;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Like Card //
const likeCard = async (card, userId) => {
    if (DB === "MongoDB") {
        try {
            if (card.likes.includes(userId)) {
                let updatedLikesArr = card.likes.filter((id) => id !== userId);
                card.likes = updatedLikesArr;
            }
            else {
                card.likes.push(userId);
            }
            await card.save();
            return card;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Change Biz Num //
const changeBizNum = async (card, newBizNum) => {
    if (DB === "MongoDB") {
        try {
            const isBizNumFree = await Card.findOne({ bizNumber: newBizNum });
            if (isBizNumFree) {
                throw new Error("Business Number is already in use by another Business Card");
            };
            card.bizNumber = newBizNum;
            await card.save();
            return card;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};
// Delete Card //
const deleteCard = async(cardId) => {
if (DB === "MongoDB") {
        try {
            let card = await Card.findByIdAndDelete(cardId);
            return card;
        } catch (error) {
            return createError("Mongoose", error);
        };
    };
    const error = new Error("The selected database doesn't exist");
    error.status = 500;
    return createError("Database", error);
};

export { getOneCard, getUserCards, getAllCards, createCard, updateCard, likeCard, changeBizNum, deleteCard };