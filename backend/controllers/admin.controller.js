import { Student } from "../models/student.model.js";
import { Teacher } from "../models/teacher.model.js";
import { Class } from "../models/class.model.js";
export const getStudents = async (req, res) => {
  try {
    let students = await Student.find().populate(
      "className"
    );
    console.log(students);

    if (students.length > 0) {
      let modifiedStudents = students.map((student) => {
        return { ...student._doc, password: undefined };
      });
      res.send(modifiedStudents);
    } else {
      res.send({ message: "No students found" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getStudentDetail = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    let student = await Student.findById(studentId)
      .populate({ path: "className", select: "name year" })
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

export const getStudentFeesSum = async (req, res, next) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: null,
          sum: { $sum: "$feesPaid" }
        }
      }
    ]);

    if (result.length > 0) {
      res.status(200).json({ sum: result[0].sum });
    } else {
      res.status(200).json({ sum: 0 }); 
    }
  } catch (error) {
    next(error); 
  }
};

export const deleteStudent = async(req, res) =>{
  try {
      const id = req.params.id;
      const foundClass = await Class.findOneAndUpdate(
          { student : id },
          { $pull: { student: id } },
          { new: true }
        );
    
        if (!foundClass) {
          return res.status(404).json({ message: 'Associated class not found' });
        }
        await Student.findByIdAndDelete(id);
    res.status(200).json({message : 'Student has been deleted!'});
  } catch (error) {
      console.log(error.message);  
  }
};

//teacher
export const getTeachers = async(req, res) => {
  try {
    const teachers = await Teacher.find().populate('teachClasses');
    if(!teachers){
      return res.status(404).json({error : "teachers not found"})
    };
    res.status(200).json(teachers);
  } catch (error) {
    console.log(error.message);  
  }
}
export const getTeacherDetail = async(req, res)=>{
  try {
      const id = req.params.id;
      const teacher = await Teacher.findById(id).populate('teachClasses');
      if(!teacher){
          return res.status(404).json({message : 'Teacher not found'});
      }
      res.status(200).json(teacher);
  } catch (error) {
      console.log(error.message);
      
  }
}

export const getTeacherSalariesSum = async (req, res, next) => {
  try {
    const result = await Teacher.aggregate([
      {
        $group: {
          _id: null,
          sum: { $sum: "$salary" }
        }
      }
    ]);

    if (result.length > 0) {
      res.status(200).json({ sum: result[0].sum });
    } else {
      res.status(200).json({ sum: 0 }); 
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    const foundClass = await Class.findOne({ teacher: req.params.id });
    if (foundClass) {
      foundClass.teacher = null;
      await foundClass.save();
    }
    await Teacher.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Teacher has been deleted' });
  } catch (error) {
    console.log(error.message);
    ;
  }
};

