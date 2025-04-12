import express from "express";
import {
  CCreateBorrowing,
  CGetAllBorrowings,
  CUpdateBorrowing,
  CDeleteBorrowing,
  CGetBorrowingsByUserId
} from "../controller/borrowing.controller";

const router = express.Router();

router.post("/", CCreateBorrowing);
router.get("/", CGetAllBorrowings);
router.put("/:id", CUpdateBorrowing);
router.delete("/:id", CDeleteBorrowing);
router.get("/:userId", CGetBorrowingsByUserId);

export default router;