import express from 'express';
import { deleteUser, getAllUsers, getOneUser, loginUser, registerUser, updateBizStatus, updateUser } from "../models/userAccessDataService.js";
import auth from '../../auth/authService.js';
import { handleError } from '../../utils/errorHandlers.js';
import { loginValidator, registrationValidator, updateValidator } from '../validation/userValidationService.js';
import normalizeUser from '../helpers/normalizeUser.js';
const router = express();

// User Login // 
router.post("/login", async (req, res) => {
    try {
        const validationTest = loginValidator(req.body);
        if (validationTest !== "") {
            return handleError(res, 400, "Validation Error - " + validationTest);
        };
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).send(token);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Register User //
router.post("/", async (req, res) => {
    try {
        const validationTest = registrationValidator(req.body);
        if (validationTest !== "") {
            return handleError(res, 400, "Validation Error - " + validationTest);
        };
        let newUser = await normalizeUser(req.body);
        newUser = await registerUser(newUser);
        res.status(201).send(newUser);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Get All Users //
router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error - Admin Access Level Required");
        };
        let users = await getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Get User by ID // 
router.get("/:id", auth,async (req, res) => {
    try {
        const userInfo = req.user;
        let userId = req.params.id;
        
        if(userInfo._id !== userId && !userInfo.isAdmin){
            return handleError(res, 403, "Authorization Error - only the user or an admin may get user profiles");
        };
        let user = await getOneUser(userId);
        res.status(200).send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Update User // 
router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const userId = req.params.id;
        const newUserInfo = req.body;

        const originalUser = await getOneUser(userId);
        if (!originalUser) {
            return handleError(res, 403, "User doesn't exist");
        }
        if (userInfo._id.toString() !== originalUser._id.toString()) {
            return handleError(res, 403, "Authentication Error - only the owner user may update the account");
        };
        const validationTest = updateValidator(req.body);
        if (validationTest !== "") {
            return handleError(res, 400, "Validation Error - " + validationTest);
        };

        let updatedUser = await normalizeUser(newUserInfo);
        updatedUser = await updateUser(userId, updatedUser);
        res.status(200).send(updatedUser);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Patch User's Business Status // 
router.patch("/:id", auth, async (req, res) => {
    try {
        let userId = req.params.id;
        let userInfo = req.user;

        let originalUser = await getOneUser(userId);
        if (!originalUser) {
            return handleError(res, 403, "User doesn't exist");
        };
        if (userInfo._id.toString() !== originalUser._id.toString()) {
            return handleError(res, 403, "Authentication Error - only the registered user may change the account's business status");
        };
        originalUser = await updateBizStatus(originalUser);
        res.status(200).send(originalUser);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
// Delete User // 
router.delete("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const user2Delete = await getOneUser(req.params.id);
        if (!user2Delete) {
            return handleError(res, 403, "User doesn't exist");
        };
        if (userInfo._id.toString() != user2Delete._id.toString() && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error - only the user or admins may delete an account.");
        };
        let deletedUser = await deleteUser(user2Delete);
        req.user = {};
        res.status(200).send(deletedUser);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    };
});
export default router;