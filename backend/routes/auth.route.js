import express from 'express'
import { login, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();


router.route('/register').post(isAuthenticated, register);
router.route('/login').post(login);
export default router;
