/*
  Warnings:

  - The values [WEB_DEVELOPMENT,MOBILE_DEVELOPMENT,UI_UX,GRAPHIC_DESIGN,COPYWRITING,MARKETING,CONSULTANCE,WEB3] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('web_development', 'mobile_development', 'ui_ux', 'graphic_design', 'copywriting', 'marketing', 'consultance', 'web3');
ALTER TABLE "Job" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;
