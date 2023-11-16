/*
  Warnings:

  - The primary key for the `Coordinates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `towers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[coordId]` on the table `towers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coordId` to the `towers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "towers" DROP CONSTRAINT "towers_id_fkey";

-- AlterTable
ALTER TABLE "Coordinates" DROP CONSTRAINT "Coordinates_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "towers" DROP CONSTRAINT "towers_pkey",
ADD COLUMN     "coordId" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "towers_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "towers_coordId_key" ON "towers"("coordId");

-- AddForeignKey
ALTER TABLE "towers" ADD CONSTRAINT "towers_coordId_fkey" FOREIGN KEY ("coordId") REFERENCES "Coordinates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
