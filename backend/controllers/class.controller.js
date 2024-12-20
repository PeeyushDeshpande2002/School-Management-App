import { Class } from "../models/class.model.js";
import { Student } from "../models/student.model.js";
import {Teacher} from '../models/teacher.model.js';
import mongoose from 'mongoose';
export const createClass = async (req, res) => {
  try {
    const { name, year, teacher, maxCount } = req.body;
    const newClass = await Class.create({
      name: name,
      teacher: teacher,
      year: year,
      maxCount : maxCount
    });
    // console.log(newClass);

    res.status(201).json(newClass);
  } catch (error) {
    console.log(error.message);
  }
};
export const getClass = async (req, res, next) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate("student")
      .populate("teacher");
    if (!classData) {
      return next(errorHandler(404, "Class not found!"));
    }
    res.status(200).json(classData);
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (req, res) => {
  const { classId, studentId, teacher, year, name } = req.body;

  try {
    // Check if classId is provided and fetch the class
    let classData;
    if (classId) {
      classData = await Class.findById(classId);
      if (!classData) return res.status(404).json({ message: "Class not found." });
    }
    console.log(studentId);
    
    // Check if adding the new student will exceed the class capacity
    if (studentId.length && classData && classData.student.length > classData.maxCount) {
      return res.status(400).json({ message: "Class is full" });
    }

    // Remove classId from the previous teacher if applicable
    if (classId && classData?.teacher && classData.teacher !== teacher) {
      await Teacher.findByIdAndUpdate(classData.teacher, {
        $pull: { teachClasses: classId },
      });
    }

    // Update class details if provided
    const updateClassPayload = {};
    if (studentId) updateClassPayload.$addToSet = { student: studentId };
    if (teacher) updateClassPayload.teacher = teacher;
    if (year) updateClassPayload.year = year;
    if (name) updateClassPayload.name = name;

    let updatedClass;
    if (classId && Object.keys(updateClassPayload).length > 0) {
      updatedClass = await Class.findByIdAndUpdate(
        classId,
        updateClassPayload,
        { new: true }
      );
      if (!updatedClass) {
        return res.status(404).json({ message: "Class update failed." });
      }
    }

    // Update student if provided
    let updatedStudent;
    if (studentId.length && classId) {
      updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $addToSet: { className: classId } },
        { new: true }
      );
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student update failed." });
      }
    }

    // Update teacher if provided
    let updatedTeacher;
    if (teacher && classId) {
      updatedTeacher = await Teacher.findByIdAndUpdate(
        teacher,
        { $addToSet: { teachClasses: classId } },
        { new: true }
      );
      if (!updatedTeacher) {
        return res.status(404).json({ message: "Teacher update failed." });
      }
    }

    res.status(200).json({
      message: "Class updated successfully.",
      ...(updatedClass && { updatedClass }),
      ...(updatedStudent && { updatedStudent }),
      ...(updatedTeacher && { updatedTeacher }),
    });
  } catch (error) {
    console.error("Error updating class:", error.message);
    res.status(500).send(error.message);
  }
};



export const getClasses = async (req, res, next) => {
    try {
      const classes = await Class.find()
      .populate('student').populate('teacher');
      return res.status(200).json(classes);
    } catch (error) {
      console.log(error.message);
    }
  };

  export const deleteClass = async (req, res, next) => {
    const classData = await Class.findById(req.params.id);
  
    if (!classData) {
      return res.status(404).json( {message :'Class not found!'});
    }
    try {
      
      const studentsToUpdate = await Student.find({ class: req.params.id });
  
     
      await Promise.all(studentsToUpdate.map(async (student) => {
        student.className = null; 
        await student.save();
      }));

      await Class.findByIdAndDelete(req.params.id);
      
      res.status(200).json('Class has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  
export const analytics = async(req, res) => {
    try {
      const { id } = req.params;
      const { month, year } = req.query;
  
      
      if (!year || isNaN(year)) {
        return res.status(400).json({ message: "Please provide a valid year" });
      }
  
      const isMonthly = month && !isNaN(month) && month >= 1 && month <= 12;
  
      
      const classDetails = await Class.findById(id)
        .populate("student") // Populate students list
        .populate("teacher"); // Populate teacher details
  
      if (!classDetails) {
        return res.status(404).json({ message: "Class not found" });
      }
  
      const maleCount = classDetails.student.filter(
        (student) => student.gender === "Male"
      ).length;
      const femaleCount = classDetails.student.filter(
        (student) => student.gender === "Female"
      ).length;
  
      // 2. Calculate Fees Paid (Monthly or Yearly)
      let totalFees = 0;
  
      classDetails.student.forEach((student) => {
        if (isMonthly) {
          // Divide annual feesPaid by 12 for monthly view
          totalFees += student.feesPaid / 12;
        } else {
          // Annual feesPaid for yearly view
          totalFees += student.feesPaid;
        }
      });
  
      // 3. Calculate Total Salaries (Monthly or Yearly)
      let totalSalary = 0;
      if (classDetails.teacher) {
        totalSalary = isMonthly
          ? classDetails.teacher.salary // Monthly salary
          : classDetails.teacher.salary * 12; // Yearly salary
      }
  
      // Send analytics response
      res.status(200).json({
        maleCount,
        femaleCount,
        totalFees: Math.round(totalFees), // Rounding for clean data
        totalSalary,
      });
    } catch (error) {
      console.error("Error fetching class analytics:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
export const removeStudentFromCLass = async (req, res) => {
    const { classId, studentId } = req.params;
  
    try {
      // Remove the student from the class document
      const updatedClass = await Class.findByIdAndUpdate(
        classId,
        { $pull: { student: studentId } }, // Assuming student is an array in Class
        { new: true }
      );
      console.log(updatedClass);
      
      if (!updatedClass) {
        return res.status(404).json({ message: "Class not found" });
      }
  
      // Remove the class from the student's className array
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $pull: { className: classId } }, // Assuming className is an array in Student
        { new: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json({
        message: "Student removed from class successfully",
        updatedClass,
        updatedStudent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  