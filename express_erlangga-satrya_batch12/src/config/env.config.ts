export const env = {
  REDIS: {
    HOST: process.env.HOST || "",
    PORT: process.env.PORT || 6379,
    USERNAME: process.env.USERNAME || "",
    PASSWORD: process.env.PASSWORD || "",
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || "jwt-secret",
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "jwt-refresh-secret",
    EXPIRED: process.env.JWT_EXPIRED || 3600,
  },
  NODE_ENV: process.env.NODE_ENV || "development",
};
