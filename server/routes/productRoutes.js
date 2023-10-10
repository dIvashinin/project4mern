import express from "express";
import { getAllProducts } from "../controller/productController.js";

const router = express.Router();

router.get("/all", getAllProducts);

export default router;