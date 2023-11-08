import express from "express";
import { getAllPosts,getSinglePost, uploadImage2, updateBlog, deleteBlog } from "../controller/blogController.js";

import multerUpload from "../middlewares/multer.js";
const router = express.Router();
// in ROUTES we should have only ROUTES, the logic goes to CONTROLLER

// router.post("/imageUpload", multerUpload.single("userImage"), uploadImage2);
// router.post("/register", register2);
router.post("/createBlogPost",multerUpload.single("blogImage"), uploadImage2);
// router.post("/createBlogPost", uploadImage2);

router.get("/all", getAllPosts);
router.get("/all/:id", getSinglePost);

//UPDATE
// router.put("/updateBlogImage",multerUpload.single("blogImage"), updateBlogImage );

router.put("/all/:id", updateBlog);
// router.put("/update", updateBlog );
// router.put("/update", multerUpload.single("blogImage"), updateBlogImage );

//DELETE
router.delete("/all/:id", deleteBlog);
export default router;
