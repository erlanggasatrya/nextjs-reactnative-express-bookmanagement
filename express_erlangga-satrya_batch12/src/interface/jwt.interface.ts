import { ERoleUser } from "@prisma/client";

export interface IJWTPayload {
  id: number;
  role: ERoleUser;
}
