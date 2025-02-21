import express from 'express';
import cardsRouterController from '../cards/routes/cardRestController.js';
import usersRouterController from '../users/routes/userRestControllers.js';
import { handleError } from '../utils/errorHandlers.js';
const router = express.Router();


router.use("/cards", cardsRouterController);
router.use("/users", usersRouterController);
router.use((req, res) => {
    handleError(res, 404, "Path not found");
});

export default router; 