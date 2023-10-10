import express, { json } from "express";
import mongoose from "mongoose";
// older notation
// const express = require("express");
import cors from "cors";
import * as dotenv from "dotenv";
import productModel from "./models/productModel.js";
dotenv.config();
const router = express.Router();

const app=express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true,
}));

app.use("/api", router);

// router.get("/test", (req, res) =>{
//     res.json({
//        message: "test route", 
//     });
// });

router.get("/products", async (req, res) =>{

    const allProducts = await productModel.find();
    console.log('allProducts :>> ', allProducts);

    res.json({
       message: "all products", 
    });
});


const DBConnection = async () => {
    console.log('process.env.DB :>> ', process.env.DB);
try {
   await mongoose.connect(process.env.DB);
   console.log('connection to MongoDB established :>> '); 
} catch (error) {
    console.log('error connecting to MongoDB :>> ');
    
}
};
DBConnection();

app.listen(port, () => {
    console.log("server running in port:", port);
});