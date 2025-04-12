import { mst_user } from "@prisma/client";

declare global {
    namespace Express {
        export interface Request {
            user?: mst_user
        }
    }
}
