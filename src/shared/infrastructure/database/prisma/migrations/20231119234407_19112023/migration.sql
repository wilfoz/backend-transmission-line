/*
  Warnings:

  - You are about to alter the column `registration` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `fullName` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropIndex
DROP INDEX "employees_registration_key";

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "registration" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fullName" SET DATA TYPE VARCHAR(255);
