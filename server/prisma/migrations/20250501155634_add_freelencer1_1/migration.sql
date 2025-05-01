/*
  Warnings:

  - Added the required column `hourlyRate` to the `Freelencer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Freelencer" ADD COLUMN     "hourlyRate" DOUBLE PRECISION NOT NULL;
