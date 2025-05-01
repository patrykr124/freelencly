-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskManagerOfferId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskManagerOfferId_fkey" FOREIGN KEY ("taskManagerOfferId") REFERENCES "TaskManagerOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
