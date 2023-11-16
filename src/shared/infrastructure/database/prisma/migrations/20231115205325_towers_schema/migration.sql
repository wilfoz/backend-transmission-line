/*
  Warnings:

  - You are about to drop the column `coordId` on the `towers` table. All the data in the column will be lost.
  - You are about to drop the `Coordinates` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coordinates` to the `towers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "towers" DROP CONSTRAINT "towers_coordId_fkey";

-- DropIndex
DROP INDEX "towers_coordId_key";

-- AlterTable
ALTER TABLE "towers" DROP COLUMN "coordId",
ADD COLUMN     "coordinates" JSON NOT NULL;

-- DropTable
DROP TABLE "Coordinates";
