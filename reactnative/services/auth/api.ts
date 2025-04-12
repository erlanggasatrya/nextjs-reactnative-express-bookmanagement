import {
  ICurrentUserResponse,
  IUserLoginRequestBody,
  IUserLoginResponseBody,
  IUserRegisterRequestBody,
} from "@/interfaces/user.interface";
import satellite from "../satellite";
import { IBaseResponse } from "@/interfaces/global.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (userData: IUserRegisterRequestBody) => {
  try {
    const response = await satellite.post<
      IBaseResponse<IUserLoginResponseBody>
    >("/auth/register", userData);

    if (response?.data?.status && response.data.data) {
      AsyncStorage.setItem("accessToken", response.data.data.token || "");
      AsyncStorage.setItem(
        "refreshToken",
        response.data.data.refreshToken || ""
      );
    }

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const loginUser = async (userData: IUserLoginRequestBody) => {
  try {
    const response = await satellite.post<
      IBaseResponse<IUserLoginResponseBody>
    >("/auth/login", userData);

    if (response?.data?.status && response.data.data) {
      AsyncStorage.setItem("accessToken", response.data.data.token || "");
      AsyncStorage.setItem(
        "refreshToken",
        response.data.data.refreshToken || ""
      );
    }

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await satellite.get<IBaseResponse<ICurrentUserResponse>>(
      "/auth/me"
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await satellite.post<IBaseResponse<null>>("/auth/logout");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const forgotPassword = async (email: string): Promise<IBaseResponse> => {
  try {
    const response = await satellite.post<IBaseResponse>(
      "/auth/forgot-password",
      { email }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const verifyOTP = async (
  email: string,
  otp: string
): Promise<IBaseResponse> => {
  try {
    const response = await satellite.post<IBaseResponse>("/auth/verify-otp", {
      email,
      otp,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
): Promise<IBaseResponse> => {
  try {
    const response = await satellite.post<IBaseResponse>(
      "/auth/reset-password",
      { email, otp, newPassword }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const editUser = async (formData: FormData): Promise<IBaseResponse> => {
  try {
    const response = await satellite.put<IBaseResponse>("/auth/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}): Promise<IBaseResponse> => {
  try {
    const response = await satellite.put<IBaseResponse>(
      "/auth/me/change-password",
      data
    ); 
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const editEmail = async (data: {
  email: string;
}): Promise<IBaseResponse> => {
  try {
    const response = await satellite.put<IBaseResponse>(
      "/auth/me/edit-email",
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
