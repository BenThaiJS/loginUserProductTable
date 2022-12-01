import express from "express";
import { verifyToken, resetPassword, forgotPassword } from "../controllers/Password.js";

const router = express.Router();

router.post("/forgotPassword", forgotPassword);
router.get("/resetPassword/:id/:token", verifyToken)
router.post("/resetPassword/:id/:token", resetPassword);

export default router;
