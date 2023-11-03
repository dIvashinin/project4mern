import express from "express";
import { getAllPosts, uploadImage2, updateBlogImage } from "../controller/blogController.js";

import multerUpload from "../middlewares/multer.js";
const router = express.Router();

// router.post("/imageUpload", multerUpload.single("userImage"), uploadImage2);
// router.post("/register", register2);

router.post("/createBlogPost",multerUpload.single("blogImage"), uploadImage2);
// router.post("/createBlogPost", uploadImage2);

router.get("/all", getAllPosts);

// router.put("/updateBlogImage",multerUpload.single("blogImage"), updateBlogImage );

router.put("/:id", updateBlogImage )

export default router;
