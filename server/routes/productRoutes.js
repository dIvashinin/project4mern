import express from "express";
import { getAllProducts, getProductsBycountryMadeIn } from "../controller/productController.js";


const router = express.Router();

router.get("/all", getAllProducts);
router.get("/:countryMadeIn", getProductsBycountryMadeIn);

export default router;