import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Student",
  },
  gender: {
    type: String,
    required: true,
  },
  className: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  feesPaid: {
    type: Number,
    default: false,
  },
  dob: {
    type: Date,
  },
  contact: {
    type: String,
  },
});

export const Student = mongoose.model("Student", studentSchema);
