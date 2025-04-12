/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `mst_user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "mst_user" ADD COLUMN     "phone_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "mst_user_phone_number_key" ON "mst_user"("phone_number");
