import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/profile",
  protect,
  authorize("hr", "admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome HR/Admin",
    });
  }
);

export default router;