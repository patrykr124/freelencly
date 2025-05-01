-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "freelencerId" TEXT;

-- CreateTable
CREATE TABLE "Freelencer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Freelencer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_freelencerId_fkey" FOREIGN KEY ("freelencerId") REFERENCES "Freelencer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
