-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('BASIC', 'STANDARD', 'PREMIUM');

-- CreateTable
CREATE TABLE "JobPackage" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "type" "PackageType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "delivery" INTEGER NOT NULL,
    "revisions" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobPackage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobPackage" ADD CONSTRAINT "JobPackage_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
