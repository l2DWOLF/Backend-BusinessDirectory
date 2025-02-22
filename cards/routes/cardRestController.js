import express from "express";
import { 
    getUserCards, getOneCard,
    getAllCards, createCard,
    updateCard, likeCard,
    changeBizNum, deleteCard
} from '../models/cardAccessDataService.js';
import auth from "../../auth/authService.js";
import normalizeCard from "../helpers/normalize.js";
import { handleError } from "../../utils/errorHandlers.js";
import cardValidator from "../validation/cardValidationService.js";
const router = express.Router();

// Get All Cards // 
router.get("/", async (req, res) => {
    try {
        let cards = await getAllCards();
        res.status(200).send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Get User Cards // 
router.get("/my-cards", auth, async (req, res) => {
    try { 
        if(!req.user._id){
            return handleError(res, 403, "Please Login.");
        }; 
        let userCards = await getUserCards(req.user._id);
        res.status(200).send(userCards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Get One Card // 
router.get("/:id", async (req, res) => {
    let cardId = req.params.id;
    try {
        let card = await getOneCard(cardId);
        res.status(200).send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Create New Card // 
router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if(!userInfo.isBusiness){
            return handleError(res, 403, "Authorization Error - Only Business Users may create business cards.");
        };        
        const validationTest = cardValidator(req.body);
        if(validationTest !== ""){
            return handleError(res, 400, " Validation Error - " +validationTest);
        };
        let card = await normalizeCard(req.body, userInfo._id);
        card = await createCard(card);
        res.status(201).send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Update - Edit Card //
router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user; 
        const cardId = req.params.id;
        const newCardInfo = req.body;
        
        const originalCard = await getOneCard(cardId);
        if(!originalCard)
        {
            return handleError(res, 403, "Card doesn't exist");
        };

        if(userInfo._id.toString() !== originalCard.user_id.toString()){
            return handleError(res, 403, "Authorization Error - only the card owner may edit this card.");
        }; 

        const validationTest = cardValidator(req.body);
        if (validationTest !== "") {
            return handleError(res, 400, validationTest);
        };
        
        if(!newCardInfo.bizNumber){
            newCardInfo.bizNumber = originalCard.bizNumber;
        }
        
        let updatedCard = await normalizeCard(newCardInfo, userInfo._id);
        updatedCard = await updateCard(cardId, updatedCard);
        res.status(200).send(updatedCard);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Like Card + Change Biz Num //
router.patch("/:id", auth, async (req, res) => {
    try {
        let cardId = req.params.id;
        let userInfo = req.user;

        if(!userInfo._id) {
            return handleError(res, 403, "Error: Only Registered Users may like business cards");
        };
        let card2Update = await getOneCard(cardId);
        if(!card2Update) {
            return handleError(res, 403, "Card doesn't exist!");
        };
        if(card2Update.bizNumber === req.body.bizNumber){
            return handleError(res, 403, `This card's Business Number is already set to: ${req.body.bizNumber}`);
        };

        if (Object.keys(req.body).length === 0){
            card2Update = await likeCard(card2Update, userInfo._id);
            res.status(200).send(card2Update);
        }
        else{
            if(!userInfo.isAdmin){
                return handleError(res, 403, "Authorization Error: Only Admins may change business numbers");
            };
            card2Update = await changeBizNum(card2Update, req.body.bizNumber);
            res.status(200).send(card2Update);
        };
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Delete Card // 
router.delete("/:id", auth, async (req, res) => {
    try {
        let cardId = req.params.id;
        const userInfo = req.user;
        
        const originalCard = await getOneCard(cardId);
        if (!originalCard) {
            return handleError(res, 403, "Card doesn't exist.");
        };
        
        if (userInfo._id.toString() !== originalCard.user_id.toString() && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: only the card owner or admins may delete a business card.");
        };

        let deletedCard = await deleteCard(cardId);
        res.status(200).send(deletedCard);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
export default router;