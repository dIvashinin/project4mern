import express from "express";
import { getAllProducts, getProductsByCountryMadeIn } from "../controller/productController.js";


const router = express.Router();

router.get("/all", getAllProducts);
router.get("/:countryMadeIn", getProductsByCountryMadeIn);

export default router;