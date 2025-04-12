import "./job/index";
import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import bookRouter from "./routes/book.route";
import authRouter from "./routes/user.route";
import borrowingRouter from "./routes/borrowing.route";
import { connectProducer } from "./config/kafka.config";
import { connectRedis } from "./config/redis.config";
import path from "path";
import fs from "fs";
import { MAuthUser } from "./middleware/auth.middleware";
console.log("Hallo bootcamp Batch 13");

connectRedis();
// connectProducer().catch((e) => console.log(e));

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/book", MAuthUser, bookRouter);
app.use("/auth", authRouter);
app.use("/borrowing", MAuthUser, borrowingRouter);

app.listen(3000, () => {
  console.log("App running on port ", 3000);
});

export default app;
