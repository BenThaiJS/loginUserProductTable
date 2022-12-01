import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser, 
} from "../controllers/User.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import { imageUpload } from "../middleware/UploadImage.js";

const router = express.Router();   

router.get("/users", verifyUser, adminOnly, getUsers)
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.post("/users", imageUpload, createUser);
router.patch("/users/:id", verifyUser, adminOnly, imageUpload, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);


export default router;
