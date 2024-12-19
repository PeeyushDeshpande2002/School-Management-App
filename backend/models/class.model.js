import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true,
    },
    year : {
        type : String,
        required : true
    },
    student :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Student'
    }],
    teacher : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Teacher'
    },
    maxCount : {
        type : Number,
        required : true
    }
});

export const Class = mongoose.model('Class', classSchema);