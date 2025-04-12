import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
} from "@/services/auth/api";
import { ICurrentUserResponse } from "@/interfaces/user.interface";

interface AuthState {
  user: ICurrentUserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      login: async (data) => {
        try {
          const response = await loginUser(data);
          set({ isAuthenticated: true });
          await get().getUser();
        } catch (error) {
          console.log(error);
          throw error;
        }
      },

      register: async (data) => {
        try {
          const response = await registerUser(data);
          set({ isAuthenticated: true });
          await get().getUser();
        } catch (error) {
          throw error;
        }
      },

      logout: async () => {
        try {
          await logoutUser();
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error("Logout error:", error);
          set({ user: null, isAuthenticated: false });
        }
      },
      getUser: async () => {
        try {
          console.log("authStore - getUser called");
          const res = await getUserDetails();
          set({ user: res.data, isAuthenticated: true });
        } catch (error) {
          console.error("Error get user:", error);
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
