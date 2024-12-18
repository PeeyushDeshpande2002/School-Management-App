import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { analytics, createClass, deleteClass, getClass, getClasses, updateClass } from '../controllers/class.controller.js';

const router = express.Router();

router.route('/create').post(isAuthenticated,createClass);
router.route('/:id').get(isAuthenticated, getClass);
router.route('/:id/analytics').get(isAuthenticated, analytics);
router.route('/update').post(isAuthenticated, updateClass);
router.route('/').get(isAuthenticated, getClasses);
router.route('/delete/:id').delete(isAuthenticated, deleteClass);

export default router;
