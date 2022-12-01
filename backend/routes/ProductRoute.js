import express from "express";
import {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByQuery,
} from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { imageUpload } from "../middleware/UploadImage.js";

const router = express.Router();

router.get("/Products", verifyUser, getProductByQuery);
router.get("/Products/:id", verifyUser, getProductById);
router.post("/Products", verifyUser, imageUpload, createProduct);
router.patch("/Products/:id", verifyUser, imageUpload, updateProduct);
router.delete("/Products/:id", verifyUser, deleteProduct);


export default router;
