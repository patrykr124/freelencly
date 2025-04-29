/*
  Warnings:

  - You are about to drop the column `type` on the `TaskManagerOffer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TaskManagerOffer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskManagerOffer" DROP CONSTRAINT "TaskManagerOffer_userId_fkey";

-- AlterTable
ALTER TABLE "TaskManagerOffer" DROP COLUMN "type",
DROP COLUMN "userId";
