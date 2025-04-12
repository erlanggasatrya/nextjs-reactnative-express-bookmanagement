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

export interface ICurrentUserResponse {
  id: number;
  name: string | null;
  email: string;
  profile: string | null;
  phone_number: string | null;
  created_at: Date;
  role: "ADMIN" | "BORROWER";
}
