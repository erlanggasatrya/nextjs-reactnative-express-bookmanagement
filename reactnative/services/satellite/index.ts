import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { env } from "@/configs/env.config";

const satellite: AxiosInstance = axios.create({
  baseURL: env.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

satellite.interceptors.request.use(
  async (request) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

satellite.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) {
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
          router.replace("/");
          return Promise.reject(error);
        }

        const refreshResponse = await axios.post(
          `${env.BASE_URL}/auth/refresh-token`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const newAccessToken = refreshResponse.data.data.token;
        await AsyncStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return satellite(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        router.replace("/");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default satellite;
