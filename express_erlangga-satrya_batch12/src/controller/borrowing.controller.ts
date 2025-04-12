import { NextFunction, Request, Response } from "express";
import {
  SCreateBorrowing,
  SGetAllBorrowings,
  SUpdateBorrowing,
  SDeleteBorrowing,
  SGetBorrowingsByUserId,
} from "../service/borrowing.service";

export const CCreateBorrowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SCreateBorrowing(req.body);
    res.status(201).json(resData);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const CGetAllBorrowings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SGetAllBorrowings();
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const CUpdateBorrowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrowingId = parseInt(req.params.id, 10);
    const resData = await SUpdateBorrowing(borrowingId, req.body);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const CDeleteBorrowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrowingId = parseInt(req.params.id, 10);
    const resData = await SDeleteBorrowing(borrowingId);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const CGetBorrowingsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      res.status(400).json({ status: false, message: "Invalid user ID" });
      return;
    }
    const resData = await SGetBorrowingsByUserId(userId);
    res.status(200).json(resData);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

