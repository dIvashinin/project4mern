// older notation
// const express = require("express");
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import passport from "passport";

import productRoutes from "./routes/productRoutes.js";
import router from "./routes/testRoute.js";
import blogRoutes from "./routes/blogRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import passportConfig from "./config/passport.js";



// import productModel from "./models/productModel.js";
// const router = express.Router();

const app=express();

const addMiddlewares = () => {
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({
        extended: true,
    }));
    cloudinaryConfig();
    //3.initialize passport
    passport.initialize();
    //4.call function that loads our own setup on passport
    passportConfig(passport);
};

const addRoutes = () => {
    app.use("/api", router);
    app.use("/api/products", productRoutes);
    app.use("/api/posts", blogRoutes);
    app.use("/api/brands", brandRoutes);
    app.use("/api/users", userRoutes);
    
    // router.get("/test", (req, res) =>{
    //     res.json({
    //        message: "test route", 
    //     });
    // });
    
    // router.get("/products");   
};


const DBConnection = async () => {
    console.log('process.env.DB :>> ', process.env.DB);
try {
   await mongoose.connect(process.env.DB);
   console.log('connection to MongoDB established :>> '); 
} catch (error) {
    console.log('error connecting to MongoDB :>> ');
    
}
};

// DBConnection();

const startServer = () => {
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
        console.log("server running in port:", port);
    });
};

(async function controller() {
    await DBConnection();
    addMiddlewares();
    addRoutes();
    startServer();
})();
