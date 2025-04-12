import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

const dbBootcamp = new PrismaClient();

export { dbBootcamp };
