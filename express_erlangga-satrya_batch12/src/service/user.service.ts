import { ERoleUser, mst_user } from "@prisma/client";
import { redisClient } from "../config/redis.config";
import {
  CreateRefreshToken,
  CreateToken,
  VerifyRefreshToken,
  VerifyToken,
} from "../helper/jwt.helper";
import { IBaseResponse } from "../interface/global.interface";
import {
  IChangePasswordRequestBody,
  ICurrentUserResponse,
  IEditUserRequestBody,
  IEditUserResponseBody,
  IJWTUserPayload,
  IRefreshTokenResponse,
  IUserLoginRequestBody,
  IUserLoginResponseBody,
  IUserRegisterRequestBody,
  IUserRegisterRequestBodyWithRole,
  IUserRegisterResponseBody,
} from "../interface/user.interface";
import { dbBootcamp } from "../prisma/client.prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { Response } from "express";
import fs from "fs/promises";
import path from "path";

export const SLoginUser = async (
  body: IUserLoginRequestBody
): Promise<IBaseResponse<IUserLoginResponseBody>> => {
  try {
    const { email, password } = body;
    const userData = await dbBootcamp.mst_user.findUnique({
      where: {
        email,
      },
    });

    if (!userData) {
      throw Error("Email or password invalid");
    }

    const isPassSame = await bcrypt.compare(password, userData.password);
    if (!isPassSame) {
      throw Error("Email or password invalid");
    }

    const tokenPayload: IJWTUserPayload = {
      id: Number(userData.id),
      role: userData.role,
    };

    const token = CreateToken(tokenPayload);
    const refreshToken = CreateRefreshToken(tokenPayload);

    const accessKey = `user-${userData.role.toLowerCase()}:token:${
      token.split(".")[2]
    }`;
    const refreshKey = `user-${userData.role.toLowerCase()}:refresh-token:${
      refreshToken.split(".")[2]
    }`;

    await redisClient.hSet(accessKey, { accessToken: token });
    await redisClient.hSet(refreshKey, { refreshToken });

    const accessExp = 30 * 60;
    const refreshExp = 1 * 24 * 60 * 60;
    await redisClient.expire(accessKey, accessExp, "NX");
    await redisClient.expire(refreshKey, refreshExp, "NX");

    return {
      status: true,
      message: "Success Login",
      data: { token, refreshToken },
    };
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};

export const SGetUser = async (
  user: mst_user
): Promise<IBaseResponse<ICurrentUserResponse>> => {
  try {
    if (!user) {
      throw new Error("User not found");
    }

    const data: ICurrentUserResponse = {
      id: Number(user.id),
      name: user.name,
      email: user.email,
      profile: user.profile,
      phone_number: user.phone_number,
      created_at: user.created_at,
      role: user.role,
    };

    return {
      status: true,
      message: "Success get user data",
      data,
    };
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};

export const SRegisterUser = async (
  body: IUserRegisterRequestBodyWithRole
): Promise<IBaseResponse<IUserRegisterResponseBody>> => {
  try {
    const { email, password, name, profile, phone_number, role } = body;

    const existingUser = await dbBootcamp.mst_user.findUnique({
      where: { email },
    });
    if (existingUser) throw Error("Email already registered!");

    if (phone_number) {
      const existingPhone = await dbBootcamp.mst_user.findUnique({
        where: { phone_number },
      });
      if (existingPhone) throw Error("Phone number already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await dbBootcamp.mst_user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profile,
        phone_number,
        role,
      },
    });

    const tokenPayload: IJWTUserPayload = {
      id: Number(newUser.id),
      role: newUser.role,
    };

    const token = CreateToken(tokenPayload);
    const refreshToken = CreateRefreshToken(tokenPayload);

    const accessKey = `user-${newUser.role.toLowerCase()}:token:${
      token.split(".")[2]
    }`;
    const refreshKey = `user-${newUser.role.toLowerCase()}:refresh-token:${
      refreshToken.split(".")[2]
    }`;

    await redisClient.hSet(accessKey, { accessToken: token });
    await redisClient.hSet(refreshKey, { refreshToken });

    const accessExp = 30 * 60;
    const refreshExp = 1 * 24 * 60 * 60;
    await redisClient.expire(accessKey, accessExp, "NX");
    await redisClient.expire(refreshKey, refreshExp, "NX");

    return {
      status: true,
      message: "Registration successful",
      data: { token, refreshToken },
    };
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};

export const SLogoutUser = async (
  token: string
): Promise<IBaseResponse<null>> => {
  try {
    if (!token) throw Error("Invalid token");

    const userData = await VerifyToken(token);
    if (!userData) throw new Error("Invalid token");

    const accessKey = `user-${userData.role.toLowerCase()}:refresh-token:${
      token.split(".")[2]
    }`;
    await redisClient.del(accessKey);

    const userRefreshTokensPattern = `user-${userData.role.toLowerCase()}:refresh-token:*`;
    const userRefreshKeys = await redisClient.keys(userRefreshTokensPattern);
    if (userRefreshKeys.length > 0) {
      await redisClient.del(userRefreshKeys);
    }

    return {
      status: true,
      message: "Logout successful",
    };
  } catch (error: any) {
    console.log("error", error);
    throw Error(error);
  }
};

export const SRefreshToken = async (
  refreshToken: string
): Promise<IBaseResponse<IRefreshTokenResponse>> => {
  try {
    if (!refreshToken) throw Error("Invalid refresh token");

    const userData = await VerifyRefreshToken(refreshToken);
    if (!userData) throw new Error("Invalid refresh token");

    const refreshKey = `user-${userData.role.toLowerCase()}:refresh-token:${
      refreshToken.split(".")[2]
    }`;
    const isExist = await redisClient.exists(refreshKey);
    if (isExist === 0) throw new Error("Invalid refresh token");

    const newAccessToken = CreateToken({
      id: Number(userData.id),
      role: userData.role,
    });

    const accessKey = `user-${userData.role.toLowerCase()}:token:${
      newAccessToken.split(".")[2]
    }`;
    await redisClient.hSet(accessKey, { accessToken: newAccessToken });
    await redisClient.expire(accessKey, 15 * 60, "NX");

    return {
      status: true,
      message: "Access token refreshed successfully",
      data: {
        token: newAccessToken,
      },
    };
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error.message || "Failed to refresh token");
  }
};

export const SEditUser = async (
  userId: number,
  data: IEditUserRequestBody
): Promise<IBaseResponse<IEditUserResponseBody>> => {
  try {
    const existingUser = await dbBootcamp.mst_user.findUnique({
      where: { id: BigInt(userId), deleted_at: null },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (data.phone_number && data.phone_number !== existingUser.phone_number) {
      const phoneExists = await dbBootcamp.mst_user.findUnique({
        where: { phone_number: data.phone_number },
      });
      if (phoneExists) {
        throw new Error("Phone number already in use");
      }
    }

    const updatedUser = await dbBootcamp.mst_user.update({
      where: { id: BigInt(userId) },
      data: {
        name: data.name,
        profile: data.profile,
        phone_number: data.phone_number,
        updated_at: new Date(),
      },
    });

    console.log(data);

    if (data.profile && existingUser.profile) {
      try {
        await fs.unlink(path.join(__dirname, "..", "..", existingUser.profile));
        console.log(`Old profile picture deleted: ${existingUser.profile}`);
      } catch (deleteError: any) {
        console.error(
          `Error deleting old profile picture: ${existingUser.profile}`,
          deleteError
        );
      }
    }

    return {
      status: true,
      message: "User updated successfully",
      data: {
        id: Number(updatedUser.id),
        name: updatedUser.name,
        email: updatedUser.email,
        profile: updatedUser.profile,
        phone_number: updatedUser.phone_number,
      },
    };
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw new Error(error.message || "Failed to update user");
  }
};

export const SEditEmail = async (
  userId: number,
  newEmail: string
): Promise<any> => {
  try {
    const existingUser = await dbBootcamp.mst_user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser && Number(existingUser.id) !== userId) {
      throw new Error("Email already in use");
    }

    const updatedUser = await dbBootcamp.mst_user.update({
      where: { id: userId },
      data: { email: newEmail },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
        phone_number: true,
      },
    });

    return { status: true, data: updatedUser };
  } catch (error: any) {
    throw new Error(error.message || "Failed to update email");
  }
};

export const SChangePassword = async (
  userId: number,
  data: IChangePasswordRequestBody
): Promise<IBaseResponse<null>> => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    if (newPassword !== confirmNewPassword) {
      throw new Error("New passwords do not match");
    }

    const existingUser = await dbBootcamp.mst_user.findUnique({
      where: { id: BigInt(userId), deleted_at: null },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );
    if (!isCurrentPasswordValid) {
      throw new Error("Incorrect current password");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await dbBootcamp.mst_user.update({
      where: { id: BigInt(userId) },
      data: {
        password: hashedNewPassword,
        updated_at: new Date(),
      },
    });

    return {
      status: true,
      message: "Password changed successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error changing password:", error);
    throw new Error(error.message || "Failed to change password");
  }
};
