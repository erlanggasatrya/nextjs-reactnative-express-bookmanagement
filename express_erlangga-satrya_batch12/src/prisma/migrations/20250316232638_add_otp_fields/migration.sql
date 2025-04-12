-- AlterTable
ALTER TABLE "mst_user" ADD COLUMN     "otp" TEXT,
ADD COLUMN     "otp_expiry" TIMESTAMP(3),
ADD COLUMN     "otp_verified" BOOLEAN NOT NULL DEFAULT false;
