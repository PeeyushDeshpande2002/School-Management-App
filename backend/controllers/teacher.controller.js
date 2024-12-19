import { Teacher } from "../models/teacher.model.js";

export const updateTeacher = async (req, res, next) => {
    const teacher= await Teacher.findById(req.params.id);
    if (!teacher) {
      return next(errorHandler(404, 'Teacher not found!'));
    }
    try {
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedTeacher);
    } catch (error) {
      next(error);
    }
  };

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
export const teacherClasses = async(req, res)=>{
  try {
    const classes = await Teacher.findById(req.id).select("teachClasses") .populate('teachClasses');
    if (!classes) {
      return res.status(404).json({ message: "Classes not found" });
    }
    const classesWithStudentCount = classes.teachClasses.map((cls) => ({
      _id: cls._id,
      name: cls.name,
      year: cls.year,
      studentCount: cls.student.length, // Adding student count
      teacher: cls.teacher,
    }));

    res.status(200).json({classes : classes.teachClasses, classesWithStudentCount})
  } catch (error) {
    console.log(error);
    
  }
}