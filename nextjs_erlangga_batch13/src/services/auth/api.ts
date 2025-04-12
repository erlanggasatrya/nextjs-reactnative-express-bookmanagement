"use server";
import { IBaseResponse } from "@/interfaces/global/index.interface";
import satellite from "../satellite";
import {
  IUserLoginRequestBody,
  IUserLoginResponseBody,
} from "@/interfaces/auth/login.interface";
import { IUserDataResponseBody } from "@/store/reducer/authData";
import { cookies } from "next/headers";
import { IForgotPasswordRequest, IResetPasswordRequest, IVerifyOTPRequest } from "@/interfaces/auth/forgotPassword.interface";

export const postLogin = async (body: IUserLoginRequestBody) => {
  const cookie = await cookies();
  const res = await satellite.post<IBaseResponse<IUserLoginResponseBody>>(
    "/auth/login",
    body
  );

  if (res?.data?.status && res.data.data) {
    cookie.set("token", res.data.data.token || "");
  }

  return res.data;
};

export const getUserLogin = async () => {
  const res = await satellite.get<IBaseResponse<IUserDataResponseBody>>(
    "/auth/me"
  );

  return res.data;
};

export const postLogout = async () => {
  const cookie = await cookies();
  const res = await satellite.post<IBaseResponse<null>>("/auth/logout");

  if (res?.data?.status) {
    cookie.delete("token");
  }

  return res.data;
};

export const checkAuthToken = async (): Promise<
  IBaseResponse<{ token: string | null }>
> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    return {
      status: true,
      message: "Token found",
      data: { token: token.value },
    };
  } else {
    return {
      status: false,
      message: "Token not found",
      data: { token: null },
    };
  }
};

export const postForgotPassword = async (body: IForgotPasswordRequest) => {
  const res = await satellite.post<IBaseResponse>(
    "/auth/forgot-password",
    body
  );
  return res.data;
};

export const postVerifyOTP = async (body: IVerifyOTPRequest) => {
  console.log("otp", body.otp);
  
  const res = await satellite.post<IBaseResponse>("/auth/verify-otp", body);
  return res.data;
};

export const postResetPassword = async (body: IResetPasswordRequest) => {
  const res = await satellite.post<IBaseResponse>("/auth/reset-password", body);
  return res.data;
};
