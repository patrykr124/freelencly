/*
  Warnings:

  - Added the required column `category` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WEB_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 'UI_UX', 'GRAPHIC_DESIGN', 'COPYWRITING', 'MARKETING');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "category" "Category" NOT NULL;
