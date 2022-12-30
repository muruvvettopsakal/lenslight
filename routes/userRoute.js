import express from 'express';
import * as userController from '../controllers/userController.js';
import * as autMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/register').post(userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/dashboard').get(autMiddleware.authenticateToken, userController.getdashboardPage);
export default router;