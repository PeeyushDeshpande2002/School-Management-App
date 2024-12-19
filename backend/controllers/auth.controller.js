import { Admin } from "../models/admin.model.js";
import { Student } from "../models/student.model.js";
import { Teacher } from "../models/teacher.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { role } = req.body;
    const adminId = req.id;
    const admin = await Admin.findById(adminId);
    if(admin){
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      if (role == "Student") {
        const { name, email, gender, dob, feesPaid, contact } = req.body;
        const existingStudent = await Student.findOne({
          email: email,
        });
        if (existingStudent) {
          res.json({ message: "Email already exists" });
        } else {
          const student = new Student({
            name: name,
            gender: gender,
            dob: dob,
            email: email,
            feesPaid: feesPaid,
            contact: contact,
            password: hashedPass,
            role: role
          });
  
          let result = await student.save();
  
          result.password = undefined;
          res.status(200).json({message :"Student Created Successfully", result});
        }
      } else if (role == "Teacher") {
        const { name, email, gender, dob, salary, contact} =
          req.body;
        const existingTeacher = await Teacher.findOne({
          email: email,
        });
        if (existingTeacher) {
          res.json({ message: "Teacher already exists" });
        } else {
          const teacher = new Teacher({
            name: name,
            email: email,
            gender: gender,
            dob: dob,
            salary: salary,
            contact: contact,
            password: hashedPass,
            role: role,
          });
          let result = await teacher.save();
          result.password = undefined;
          res.json({message :"Teacher Created Successfully", result});
        }
      } else if (role == "Admin") {
        // console.log('I m here');
  
        const { name, email } = req.body;
        const existingAdmin = await Admin.findOne({
          email: email,
        });
        if (existingAdmin) {
          res.json({ message: "Email already exists" });
        } else {
          const admin = new Admin({
            email: email,
            name: name,
            password: hashedPass,
            role: role,
          });
          // console.log(admin);
  
          const result = await admin.save();
          result.password = undefined;
          // console.log(result);
  
          res.status(200).json(result);
        }
      } else {
        res.json({ message: "Please select role" });
      }
    }
    // console.log(role == 'Admin');

  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //console.log(email, password, role );
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please Enter the credentials",
        success: false,
      });
    }
    let user;
    if (role == "Admin") {
      user = await Admin.findOne({ email: email });
    } else if (role == "Student") {
      user = await Student.findOne({ email: email });
    } else if (role == "Teacher") {
      user = await Teacher.findOne({ email: email });
    } else {
      return res.status(400).json({
        message: "Account doesnt exist with selected role",
        success: false,
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesnt exist with selected role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.Secret_Key, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.name}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
