import { NextFunction, Request, Response } from "express";
import {
  SGetUser,
  SLoginUser,
  SRegisterUser,
  SLogoutUser,
  SRefreshToken,
  SEditUser,
  SChangePassword,
  SEditEmail,
} from "../service/user.service";
import multer from "multer";
import path from "path";
import {
  IChangePasswordRequestBody,
  IEditUserRequestBody,
  IUserRegisterRequestBody,
  IUserRegisterRequestBodyWithRole,
} from "../interface/user.interface";
import { ERoleUser } from "@prisma/client";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      path.posix.join(
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      )
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export const CLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SLoginUser(req.body);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error!",
    });
  }
};

export const CGetUserDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SGetUser(req.user!);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error!",
    });
  }
};

export const CRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    upload.single("profile")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const userData: IUserRegisterRequestBodyWithRole = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        profile: req.file ? req.file.path : undefined,
        phone_number: req.body.phone_number,
        role: (req.body.role as ERoleUser) || ERoleUser.BORROWER,
      };

      const resData = await SRegisterUser(userData);
      res.status(201).json(resData);
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error!",
    });
  }
};

export const CLogoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const resData = await SLogoutUser(token);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error!",
    });
  }
};

export const CRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const refreshToken = authHeader.split(" ")[1];

    if (!refreshToken) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const resData = await SRefreshToken(refreshToken);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error!",
    });
  }
};

export const CEditUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    upload.single("profile")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const userId = Number(req.user!.id);
      const updateData: IEditUserRequestBody = {
        name: req.body.name,
        profile: req.file ? req.file.path : undefined,
        phone_number: req.body.phone_number,
      };

      const resData = await SEditUser(userId, updateData);
      res.status(200).json(resData);
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error!",
    });
  }
};

export const CEditEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user!.id);
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ status: false, message: "Email is required" });
      return;
    }

    const resData = await SEditEmail(userId, email); 
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error!",
    });
  }
};

export const CChangePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user!.id);
    const changePasswordData: IChangePasswordRequestBody = {
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
      confirmNewPassword: req.body.confirmNewPassword,
    };

    const resData = await SChangePassword(userId, changePasswordData);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error!",
    });
  }
};
