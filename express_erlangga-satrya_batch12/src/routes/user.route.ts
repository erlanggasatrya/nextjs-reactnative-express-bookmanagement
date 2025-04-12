import { Router } from "express";
import {
  CChangePassword,
  CEditEmail,
  CEditUser,
  CGetUserDetail,
  CLoginUser,
  CLogoutUser,
  CRefreshToken,
  CRegisterUser,
} from "../controller/user.controller";
import { MAuthUser } from "../middleware/auth.middleware";
import {
  CForgotPassword,
  CResetPassword,
  CVerifyOTP,
} from "../controller/auth.controller";

const router = Router();

router.post("/login", CLoginUser);
router.get("/me", MAuthUser, CGetUserDetail);
router.post("/register", CRegisterUser);
router.post("/logout", MAuthUser, CLogoutUser);
router.post("/refresh", MAuthUser, CRefreshToken);
router.put("/me", MAuthUser, CEditUser);
router.put("/me/edit-email", MAuthUser, CEditEmail);
router.put("/me/change-password", MAuthUser, CChangePassword);
router.post("/forgot-password", CForgotPassword);
router.post("/verify-otp", CVerifyOTP);
router.post("/reset-password", CResetPassword);

export default router;
