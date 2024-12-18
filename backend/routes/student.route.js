import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { getStudentDetail, updateStudent } from '../controllers/student.controller.js';

const router = express.Router();

router.route('/update/:id').post(isAuthenticated, updateStudent);
router.route('/:studentId/detail').get(isAuthenticated, getStudentDetail);

export default router;
