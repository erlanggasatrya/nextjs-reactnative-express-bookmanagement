-- CreateEnum
CREATE TYPE "ERoleUser" AS ENUM ('ADMIN', 'BORROWER');

-- CreateTable
CREATE TABLE "mst_user" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "profile" TEXT,
    "role" "ERoleUser" NOT NULL DEFAULT 'BORROWER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "mst_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mst_user_email_key" ON "mst_user"("email");
