import express from "express";
import { loginAdmin, checkAdminAuth, getAdminJobs, createAdminJob } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post('/logout', adminAuth, (req, res) => {
    try {
      // Optionally invalidate the token here
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
router.get("/jobs", adminAuth, getAdminJobs);

router.post("/jobs/create", adminAuth, createAdminJob); 
router.get("/check-auth", adminAuth, checkAdminAuth);

export default router;
