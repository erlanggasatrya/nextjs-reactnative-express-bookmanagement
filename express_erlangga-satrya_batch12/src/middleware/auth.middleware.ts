import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { IJWTUserPayload } from "../interface/user.interface";
import { redisClient } from "../config/redis.config";
import { dbBootcamp } from "../prisma/client.prisma";
import { VerifyToken } from "../helper/jwt.helper";

export const MAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer "))
      throw Error("Unauthorize!");

    const token = authorization.split(" ")[1];
    const userData = await VerifyToken(token);

    const key = `user-${userData.role.toLowerCase()}:token:${
      token.split(".")[2]
    }`;
    const isTokenExist = await redisClient.exists(key);

    if (isTokenExist === 0) throw Error("Unauthorize!");

    const user = await dbBootcamp.mst_user.findUnique({
      where: {
        id: userData.id,
      },
    });
    if (!user) throw Error("User not found in middleware");

    req.user = user;

    next();
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};
