import express from "express";
import { getAllBrands } from "../controller/brandController.js";

const router = express.Router();

router.get("/all", getAllBrands);

export default router;