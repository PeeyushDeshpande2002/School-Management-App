import express from 'express'
import { deleteStudent, deleteTeacher, getStudentDetail, getStudentFeesSum, getStudents, getTeacherDetail, getTeachers, getTeacherSalariesSum } from '../controllers/admin.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/students').get(isAuthenticated, getStudents);
router.route('/:studentId/detail').get(isAuthenticated, getStudentDetail);
router.route('/student/fees').get(isAuthenticated, getStudentFeesSum);
router.route('/student/delete/:id').delete(isAuthenticated, deleteStudent);

//teacher
router.route('/teachers').get(isAuthenticated, getTeachers);
router.route('/:id/detail').get(isAuthenticated, getTeacherDetail);
router.route('/teacher/salaries').get(isAuthenticated, getTeacherSalariesSum);
router.route('/teacher/delete/:id').delete(isAuthenticated, deleteTeacher);
export default router;
