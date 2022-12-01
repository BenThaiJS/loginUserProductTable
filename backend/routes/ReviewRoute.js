import express from "express";
import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
  getReviewsByProductId
} from "../controllers/Reviews.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/reviews", verifyUser, addReview);
router.get("/reviews", verifyUser, getReviews);
router.delete("/reviews/:id", verifyUser, deleteReview);
router.patch("/reviews/:id", verifyUser, updateReview);
router.get("/reviews/:id", verifyUser, getReviewsByProductId);

export default router;
