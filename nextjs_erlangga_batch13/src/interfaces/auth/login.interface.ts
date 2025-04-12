export interface IUserLoginRequestBody {
  email: string;
  password: string;
}

export interface IUserLoginResponseBody {
  token: string;
  refreshToken: string;
}

export interface IUserDataResponseBody {
  name: string | null;
  id: bigint;
  email: string;
  profile: string;
  role: "ADMIN" | "BORROWER";
  created_at: Date;
}
