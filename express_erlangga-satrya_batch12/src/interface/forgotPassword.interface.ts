export interface IForgotPasswordRequest {
  email: string;
}

export interface IVerifyOTPRequest {
  email: string;
  otp: string;
}

export interface IResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}
