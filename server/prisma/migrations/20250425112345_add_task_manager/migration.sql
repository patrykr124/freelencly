/*
  Warnings:

  - You are about to drop the column `userId` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_userId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "TaskManagerOffer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT,
    "type" "PackageType" NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "deliveryDays" INTEGER NOT NULL,

    CONSTRAINT "TaskManagerOffer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskManagerOffer" ADD CONSTRAINT "TaskManagerOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskManagerOffer" ADD CONSTRAINT "TaskManagerOffer_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
