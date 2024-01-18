/*
  Warnings:

  - You are about to drop the column `type_of_foundation_A` on the `towers` table. All the data in the column will be lost.
  - You are about to drop the column `type_of_foundation_B` on the `towers` table. All the data in the column will be lost.
  - You are about to drop the column `type_of_foundation_C` on the `towers` table. All the data in the column will be lost.
  - You are about to drop the column `type_of_foundation_D` on the `towers` table. All the data in the column will be lost.
  - You are about to drop the column `type_of_foundation_MC` on the `towers` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TOWER_TYPE" AS ENUM ('EST', 'AUT');

-- AlterTable
ALTER TABLE "towers" DROP COLUMN "type_of_foundation_A",
DROP COLUMN "type_of_foundation_B",
DROP COLUMN "type_of_foundation_C",
DROP COLUMN "type_of_foundation_D",
DROP COLUMN "type_of_foundation_MC";

-- CreateTable
CREATE TABLE "foundations" (
    "id" UUID NOT NULL,
    "project" VARCHAR(255) NOT NULL,
    "revision" VARCHAR(10) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "aplication" "TOWER_TYPE" NOT NULL,
    "excavation_volume" DOUBLE PRECISION,
    "concrete_volume" DOUBLE PRECISION,
    "backfill_volume" DOUBLE PRECISION,
    "steel_volume" DOUBLE PRECISION,

    CONSTRAINT "foundations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FoundationToTower" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoundationToTower_AB_unique" ON "_FoundationToTower"("A", "B");

-- CreateIndex
CREATE INDEX "_FoundationToTower_B_index" ON "_FoundationToTower"("B");

-- AddForeignKey
ALTER TABLE "_FoundationToTower" ADD CONSTRAINT "_FoundationToTower_A_fkey" FOREIGN KEY ("A") REFERENCES "foundations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoundationToTower" ADD CONSTRAINT "_FoundationToTower_B_fkey" FOREIGN KEY ("B") REFERENCES "towers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
