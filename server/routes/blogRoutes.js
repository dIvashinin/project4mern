import express from "express";
import { getAllBlogs, register2, uploadImage2 } from "../controller/blogController.js";

import multerUpload from "../middlewares/multer.js";
const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage2);
router.post("/register", register2);

router.get("/all", getAllBlogs);

export default router;
