import { env } from "../config/env.config";
import { IJWTPayload } from "../interface/jwt.interface";
import jwt from "jsonwebtoken";
import { dbBootcamp } from "../prisma/client.prisma";
import { mst_user, Prisma } from "@prisma/client";
import { IJWTUserPayload } from "../interface/user.interface";

export const CreateToken = (payload: IJWTPayload) =>
  jwt.sign(payload, env.JWT.SECRET, {
    // expiresIn: env.JWT.EXPIRED as number,
    expiresIn: "30m",
    algorithm: "HS256",
  });

export const CreateRefreshToken = (payload: IJWTPayload) =>
  jwt.sign(payload, env.JWT.REFRESH_SECRET, {
    expiresIn: "1d",
    algorithm: "HS256",
  });

export const VerifyToken = async (token: string): Promise<IJWTUserPayload> => {
  try {
    const tokenData = jwt.verify(token, env.JWT.SECRET) as IJWTPayload;
    if (!tokenData || !tokenData.id) {
      throw Error("Failed verify token!");
    }

   const userExists = await dbBootcamp.mst_user.findUnique({
      where: { id: tokenData.id },
      select: { id: true, role: true },
    });

    if (!userExists) {
      throw new Error("User not found");
    }
    if(userExists.role !== tokenData.role) {
        throw new Error("Invalid access token");
    }

    return tokenData; 
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
};

export const VerifyRefreshToken = async (
  token: string
): Promise<IJWTUserPayload> => {
  try {
    const tokenData = jwt.verify(token, env.JWT.REFRESH_SECRET) as IJWTPayload;
    if (!tokenData || !tokenData.id) throw new Error("Invalid refresh token");

    return tokenData;
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
};
