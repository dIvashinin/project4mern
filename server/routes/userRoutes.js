import express from "express";
import {uploadImage} from "../controller/userController.js";
const router = express.Router();

router.post("/imageUpload", uploadImage);



export default router;