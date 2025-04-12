import { ERoleUser } from "@prisma/client";

export interface IJWTUserPayload {
  id: number;
  role: ERoleUser;
}

export interface IUserLoginRequestBody {
  email: string;
  password: string;
}

export interface IUserLoginResponseBody {
  token: string;
  refreshToken: string;
}

export interface IUserRegisterRequestBody {
  email: string;
  password: string;
  name?: string;
  profile?: string;
  phone_number?: string;
}

export interface IUserRegisterResponseBody {
  token: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  token: string;
}

export interface ICurrentUserResponse {
  id: number;
  name: string | null;
  email: string;
  profile: string | null;
  phone_number: string | null;
  created_at: Date;
  role: ERoleUser;
}

export interface IUserRegisterRequestBodyWithRole
  extends IUserRegisterRequestBody {
  role?: ERoleUser;
}

export interface IEditUserRequestBody {
  name?: string;
  profile?: string;
  phone_number?: string;
}

export interface IEditUserResponseBody {
  id: number;
  name: string | null;
  email: string;
  profile: string | null;
  phone_number: string | null;
}

export interface IChangePasswordRequestBody {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IEditEmailRequestBody {
  email: string;
}
