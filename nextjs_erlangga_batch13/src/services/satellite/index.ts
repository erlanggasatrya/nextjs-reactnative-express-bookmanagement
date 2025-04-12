"use server";
import { env } from "@/configs/env.config";
import axios from "axios";
import { cookies } from "next/headers";

const satellite = axios.create({
  baseURL: env.BASE_URL,
  timeout: 20_000,
  headers: {
    // "Content-Type" : "application/json",
    //   "X-Content-Type-Options" : "nosniff",
    //   "X-XSS-Protection" : "SAMEORIGIN",
    //   "Strict-Transport-Security" : max-age=31536000; includeSubDomains; preload,
    //   "X-XSS-Protection" : 1; mode=block,
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Frame-Options": "SAMEORIGIN",
  },
});

satellite.interceptors.request.use(
  async (request) => {
    const cookie = await cookies();
    const token = cookie.get("token");

    request.headers["Authorization"] = `Bearer ${token?.value}`;

    return request;
  },
  async (error) => Promise.reject(error)
);

satellite.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => Promise.reject(error)
);

export default satellite;
