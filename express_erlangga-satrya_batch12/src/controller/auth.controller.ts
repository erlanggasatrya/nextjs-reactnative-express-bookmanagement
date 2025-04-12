import { NextFunction, Request, Response } from "express";
import { SForgotPassword, SResetPassword, SVerifyOTP } from "../service/auth.service";


export const CForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SForgotPassword(req.body.email);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const CVerifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    const resData = await SVerifyOTP(email, otp);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const CResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, newPassword } = req.body;
    const resData = await SResetPassword(email, otp, newPassword);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};