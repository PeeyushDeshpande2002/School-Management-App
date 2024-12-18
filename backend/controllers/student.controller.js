import { Class } from "../models/class.model.js";
import { Student } from "../models/student.model.js";

export const updateStudent = async(req, res) => {
    const student= await Student.findById(req.params.id);
  if (!student) {
    return next(errorHandler(404, 'Student not found!'));
  }
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.log(error.message);
  }
};

export const getStudentDetail = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    let student = await Student.findById(studentId)
      .populate({ path: "className", select: "name year" }).populate('teacher')
    console.log(student);

    if (student) {
      student.password = undefined;
      res.send(student);
    } else {
      res.send({ message: "No student found" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

