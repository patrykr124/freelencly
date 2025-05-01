/*
  Warnings:

  - You are about to drop the column `hourlyRate` on the `Freelencer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Freelencer` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Freelencer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Freelencer" DROP COLUMN "hourlyRate",
DROP COLUMN "name",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskManagerOffer" ADD COLUMN     "freelencerId" TEXT;

-- AddForeignKey
ALTER TABLE "Freelencer" ADD CONSTRAINT "Freelencer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskManagerOffer" ADD CONSTRAINT "TaskManagerOffer_freelencerId_fkey" FOREIGN KEY ("freelencerId") REFERENCES "Freelencer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
