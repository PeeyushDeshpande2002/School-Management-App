import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      password : {
        type : String,
        required : true
     },
     role: {
      type: String,
      default: "Teacher"
  },
    email : {
    type : String, 
    required : true,
    },
      gender : {
        type : String,
        required : true,
      },
      teachClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      }],
      salary: {
        type: Number,
        default: false,
      },
      dob: {
        type: Date,
      },
      contact: {
        type: String,
      },
})

export const Teacher = mongoose.model('Teacher', teacherSchema);