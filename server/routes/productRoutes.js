import express from "express";
import { getAllProducts, getCitiesByCountryCode } from "../controller/productController.js";


const router = express.Router();

router.get("/all", getAllProducts);
router.get("/:countryCode", getCitiesByCountryCode);

export default router;