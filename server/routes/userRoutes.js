import express from "express";
import {
  login,
  register,
  uploadImage,
  getAllUsers,
  getProfile,
} from "../controller/userController.js";

import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";
const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/register", register);
router.post("/login", login);
router.get("/all", getAllUsers);
router.get("/profile",jwtAuth , getProfile);

export default router;
