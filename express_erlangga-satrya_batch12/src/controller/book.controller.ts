import { NextFunction, Request, Response } from "express";
import {
  SCreateBook,
  SDeleteBook,
  SGetAllBook,
  SGetAllBookWithoutPagination,
  SGetBookById,
  SUpdateBook,
} from "../service/book.service";
import multer from "multer";
import path from "path";

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
});

export const CCreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    upload.single("cover_img")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const bookData = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        description: req.body.description,
        publisher: req.body.publisher,
        cover_img: req.file ? req.file.path : "",
      };

      const resData = await SCreateBook(bookData);
      res.status(200).json(resData);
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error!",
    });
  }
};

export const CGetAllBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 10; 

    const resData = await SGetAllBook(page, limit);

    res.status(200).json(resData);
  } catch (e: any) {
    res.status(400).json({
      status: false,
      message: e.message || "Internal server error",
    });
  }
};

export const CGetAllBookWithoutPagination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SGetAllBookWithoutPagination();

    res.status(200).json(resData);
  } catch (e: any) {
    res.status(400).json({
      status: false,
      message: e.message || "Internal server error",
    });
  }
};

export const CDeleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SDeleteBook(+(<number>(<unknown>req.params.id)));

    res.status(200).json(resData);
  } catch (e: any) {
    res.status(400).json({
      status: false,
      message: e.message || "Internal server error",
    });
  }
};

export const CGetBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SGetBookById(+(<number>(<unknown>req.params.id)));

    res.status(200).json(resData);
  } catch (e: any) {
    res.status(400).json({
      status: false,
      message: e.message || "Internal server error",
    });
  }
};

export const CUpdateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    upload.single("cover_img")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const bookData = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        description: req.body.description,
        publisher: req.body.publisher,
        cover_img: req.file && req.file.path,
      };

      if (req.file) {
        bookData.cover_img = req.file.path;
      }

      const resData = await SUpdateBook(
        +(<number>(<unknown>req.params.id)),
        bookData
      );
      res.status(200).json(resData);
    });
  } catch (e: any) {
    res.status(400).json({
      status: false,
      message: e.message || "Internal server error",
    });
  }
};
