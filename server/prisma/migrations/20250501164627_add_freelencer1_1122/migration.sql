/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Freelencer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Freelencer_userId_key" ON "Freelencer"("userId");
