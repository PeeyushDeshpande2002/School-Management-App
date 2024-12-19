import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { getTeacherDetail, teacherClasses, updateTeacher } from '../controllers/teacher.controller.js';

const router = express.Router();

router.route('/update/:id').post(isAuthenticated, updateTeacher);
router.route('/:id/detail').get(isAuthenticated, getTeacherDetail);
router.route('/').get(isAuthenticated, teacherClasses);
export default router;
