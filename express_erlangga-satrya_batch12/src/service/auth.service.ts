import { dbBootcamp } from "../prisma/client.prisma";
import { IBaseResponse } from "../interface/global.interface";
import { sendEmail } from "../service/email.service";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { generateOTPEmailHTML } from "../helper/email.helper";

export const SForgotPassword = async (
  email: string
): Promise<IBaseResponse> => {
  try {
    const user = await dbBootcamp.mst_user.findUnique({
      where: { email, deleted_at: null },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await dbBootcamp.mst_user.update({
      where: { email },
      data: { otp, otp_expiry: otpExpiry, otp_verified: false },
    });

    const htmlContent = generateOTPEmailHTML(otp);

    const emailSent = await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is: ${otp}`,
      htmlContent
    );

    if (!emailSent) {
      throw new Error("Failed to send OTP email");
    }

    return { status: true, message: "OTP sent to your email" };
  } catch (error: any) {
    console.error("Error in forgot password:", error);
    throw new Error(error.message || "Forgot password failed");
  }
};

export const SVerifyOTP = async (
  email: string,
  otp: string
): Promise<IBaseResponse> => {
  try {
    const user = await dbBootcamp.mst_user.findUnique({
      where: { email, deleted_at: null },
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (
      user.otp !== otp ||
      !user.otp_expiry ||
      user.otp_expiry < new Date() ||
      user.otp_verified
    ) {
      throw new Error("Invalid or expired OTP");
    }

    await dbBootcamp.mst_user.update({
      where: { email },
      data: { otp_verified: true },
    });

    return { status: true, message: "OTP verified successfully" };
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    throw new Error(error.message || "OTP verification failed");
  }
};

export const SResetPassword = async (
  email: string,
  otp: string,
  newPassword: string
): Promise<IBaseResponse> => {
  try {
    const user = await dbBootcamp.mst_user.findUnique({
      where: { email, deleted_at: null },
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.otp_verified || user.otp !== otp) {
      throw new Error(
        "OTP not verified or does not match. Please verify OTP first."
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await dbBootcamp.mst_user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otp_expiry: null,
        otp_verified: false,
      },
    });

    return { status: true, message: "Password reset successfully" };
  } catch (error: any) {
    console.error("Error resetting password:", error);
    throw new Error(error.message || "Password reset failed");
  }
};
