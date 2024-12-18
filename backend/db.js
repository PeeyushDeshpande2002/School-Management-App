import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log('MongoDB Connected Successfully');    
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;