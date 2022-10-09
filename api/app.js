import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import helmet from "helmet";

import User from "./models/User.js";
import AnimeList from "./models/AnimeList.js";
import userRoute from "./routes/user.js";
import animeListRoute from "./routes/animeList.js";
import authRoute from "./routes/auth.js";

dotenv.config();

//mongoDB Connection 
(async function connectToDatabase(){
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Successfully connected to Mongodb")
    } catch (error) {
        console.error(error);
    }
})();

const app = express();


const port = process.env.PORT || 8800;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
/* Routes */
app.use("/api/user",userRoute);
app.use("/api/animeList",animeListRoute);
app.use("/api/auth",authRoute);
app.listen(port,()=> console.log(`Server is connected on port ${port} `))