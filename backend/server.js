import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/auth.route.js';
import adminRoute from './routes/admin.route.js';
import classRoute from './routes/class.route.js';
import studentRoute from './routes/student.route.js';
import teacherRoute from './routes/teacher.route.js';
const app = express();
dotenv.config({});
const corsOptions = {
    origin : `https://www.schoolmanagement.webthoughts.in`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials : true,
}
app.use(cors(corsOptions));
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/class', classRoute);
app.use('/api/student', studentRoute);
app.use('/api/teacher', teacherRoute)
const Port = process.env.Port || 3000;
app.listen(Port,  ()=>{
    connectDB();
    console.log(`Server running of port ${Port}`);
    
});