/*
  Warnings:

  - Added the required column `img` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'CONSULTANCE';
ALTER TYPE "Category" ADD VALUE 'WEB3';

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
