import { Router } from "express";
import {
  CCreateBook,
  CDeleteBook,
  CGetAllBook,
  CGetAllBookWithoutPagination,
  CGetBookById,
  CUpdateBook,
} from "../controller/book.controller";
import { createBookSchema, updateBookSchema } from "../validation/book.validation";
import { MValidate } from "../middleware/validation.middleware";

const router = Router();

router.post("/", CCreateBook);
router.get("/", CGetAllBook);
router.get("/all", CGetAllBookWithoutPagination);
router.delete("/:id", CDeleteBook);
router.get("/:id", CGetBookById);
router.put("/:id", CUpdateBook);

export default router;
