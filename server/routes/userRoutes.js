import express from "express";
import {uploadImage} from "../controller/userController.js";
import { register } from "../controller/userController.js";


import multerUpload from "../middlewares/multer.js";
const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/register", register);


export default router;