/*
  Warnings:

  - You are about to drop the column `coordinates` on the `towers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "towers" DROP COLUMN "coordinates";

-- CreateTable
CREATE TABLE "Coordinates" (
    "id" UUID NOT NULL,
    "latitude" VARCHAR(20) NOT NULL,
    "longitude" VARCHAR(20) NOT NULL,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coordinates" ADD CONSTRAINT "Coordinates_id_fkey" FOREIGN KEY ("id") REFERENCES "towers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
