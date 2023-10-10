import express, { json } from "express";
// import { getAllProducts } from "../controller/productController.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        message: "test route",
    });
});

export default router;