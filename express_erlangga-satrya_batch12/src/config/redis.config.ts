import { createClient } from "redis";
import { env } from "./env.config";

export const redisClient = createClient({
  socket: {
    host: env.REDIS.HOST,
    port: +env.REDIS.PORT,
  },
//   username: env.REDIS.USERNAME,
//   password: env.REDIS.PASSWORD,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error: any) {
    console.error("Failed to connect to Redis", error);
  }
};
