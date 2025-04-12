import express from "express";
import {
  CForgotPassword,
  CVerifyOTP,
  CResetPassword,
} from "../controller/auth.controller";

const router = express.Router();

router.post("/forgot", CForgotPassword);
router.post("/verify-otp", CVerifyOTP);
router.post("/reset", CResetPassword);

export default router;