//packages imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from 'morgan';
import bodyparser from "body-parser";

//securty packges
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//files imports
import connectDB from "./config/db.js";

//routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errroMiddelware from "./middlewares/errorMiddleware.js";
// import bodyParser from "body-parser";
//dot env config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
// app.use(helmet(``));
// app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// routes
app.use("/api/v1/test",testRoutes);
app.use("/api/v1/auth", authRoutes);

//validation middelware
app.use(errroMiddelware);


//port
const PORT = process.env.PORT||8080 
// listen
app.listen(PORT,()=>{
    console.log(`Node Server is running in ${process.env.DEV_MODE} on port no ${PORT}`.bgCyan.white);
        
    
});