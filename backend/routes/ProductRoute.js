import express from "express";
import {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByQuery,
} from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { imagesUpload } from "../middleware/UploadImage.js";

const router = express.Router();

router.get("/Products", verifyUser, getProductByQuery);
router.get("/Products/:id", verifyUser, getProductById);
router.post("/Products", verifyUser, imagesUpload, createProduct);
router.patch("/Products/:id", verifyUser, imagesUpload, updateProduct);
router.delete("/Products/:id", verifyUser, deleteProduct);


export default router;
