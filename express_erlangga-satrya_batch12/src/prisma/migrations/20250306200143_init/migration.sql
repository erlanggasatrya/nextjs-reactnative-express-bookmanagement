/*
  Warnings:

  - You are about to drop the column `updates_at` on the `book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "updates_at",
ADD COLUMN     "author" VARCHAR(100),
ADD COLUMN     "updated_at" TIMESTAMP(3);
