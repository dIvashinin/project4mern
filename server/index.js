import express, { json } from "express";
import mongoose from "mongoose";
// older notation
// const express = require("express");
import cors from "cors";
import * as dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import router from "./routes/testRoute.js";

// import productModel from "./models/productModel.js";
dotenv.config();
// const router = express.Router();

const app=express();



const addMiddlewares = () => {
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({
        extended: true,
    }));

}




const addRoutes = () => {
    app.use("/api", router);
    app.use("/api/products", productRoutes);
    
    // router.get("/test", (req, res) =>{
    //     res.json({
    //        message: "test route", 
    //     });
    // });
    
    // router.get("/products");   
};


const DBConnection = async () => {
    // console.log('process.env.DB :>> ', process.env.DB);
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
