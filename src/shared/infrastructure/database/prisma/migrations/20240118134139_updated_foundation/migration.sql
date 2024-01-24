/*
  Warnings:

  - You are about to drop the column `aplication` on the `foundations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "foundations" DROP COLUMN "aplication";

-- DropEnum
DROP TYPE "TOWER_TYPE";
