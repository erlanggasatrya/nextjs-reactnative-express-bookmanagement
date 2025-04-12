import { createSlice } from "@reduxjs/toolkit";

export interface IUserDataResponseBody {
  name: string | null;
  id: number;
  email: string;
  profile: string | null;
  role: "ADMIN" | "BORROWER" | null;
  created_at: Date | null;
}

const initialState: IUserDataResponseBody = {
  id: 0,
  created_at: null,
  email: "",
  name: "",
  profile: "",
  role: null,
};

export const authDataSlice = createSlice({
  name: "auth_slice",
  initialState,
  reducers: {
    setUserData: (state, action) => ({
      ...action.payload,
    }),
    resetAuth: () => ({ ...initialState }),
  },
});

export const authDataActions = authDataSlice.actions;
export const authDataReducers = authDataSlice.reducer;
