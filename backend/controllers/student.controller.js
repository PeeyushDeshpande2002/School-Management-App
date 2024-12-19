import { Class } from "../models/class.model.js";
import { Student } from "../models/student.model.js";

export const updateStudent = async(req, res) => {
  console.log(req.body, req.params.id);
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
    res.status(200).json({message : "Student Profile Updated!", updatedStudent});
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message)
  }
};

export const getStudentDetail = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    let student = await Student.findById(studentId)
      .populate({ path: "className", select: "name year" })
    //console.log(student);
     if (student) {
      student.password = undefined;
      res.status(200).json(student);
    } else {
      res.send({ message: "No student found" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const studentClasses = async(req, res)=>{
  try {
    const classes = await Student.findById(req.id).select("className") .populate('className');
    if (!classes) {
      return res.status(404).json({ message: "Classes not found" });
    }

    res.status(200).json(classes.className)
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message)
  }
}

