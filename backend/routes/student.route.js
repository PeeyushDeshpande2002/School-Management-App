import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { getStudentDetail, updateStudent , studentClasses} from '../controllers/student.controller.js';

const router = express.Router();

router.route('/update/:id').post(isAuthenticated, updateStudent);
router.route('/:studentId/detail').get(isAuthenticated, getStudentDetail);
router.route('/').get(isAuthenticated, studentClasses)
export default router;
