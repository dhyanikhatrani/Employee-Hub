import { Router } from "express";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed Successfully",
  });
});

export default router;