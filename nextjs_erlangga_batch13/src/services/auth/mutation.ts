import { IUserLoginRequestBody } from "@/interfaces/auth/login.interface";
import { useMutation } from "@tanstack/react-query";
import { postForgotPassword, postLogin, postLogout, postResetPassword, postVerifyOTP } from "./api";
import { IForgotPasswordRequest, IResetPasswordRequest, IVerifyOTPRequest } from "@/interfaces/auth/forgotPassword.interface";

export const usePostLogin = () =>
  useMutation({
    mutationKey: ["login-user"],
    mutationFn: (body: IUserLoginRequestBody) => postLogin(body),
  });

export const usePostLogout = () =>
  useMutation({
    mutationKey: ["logout-user"],
    mutationFn: () => postLogout(),
  });

export const useForgotPassword = () =>
  useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (body: IForgotPasswordRequest) => postForgotPassword(body),
  });

export const useVerifyOTP = () =>
  useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: (body: IVerifyOTPRequest) => postVerifyOTP(body),
  });

export const useResetPassword = () =>
  useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (body: IResetPasswordRequest) => postResetPassword(body),
  });
