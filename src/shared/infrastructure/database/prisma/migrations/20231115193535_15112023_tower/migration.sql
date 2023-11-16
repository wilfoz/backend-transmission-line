-- DropForeignKey
ALTER TABLE "Coordinates" DROP CONSTRAINT "Coordinates_id_fkey";

-- AddForeignKey
ALTER TABLE "towers" ADD CONSTRAINT "towers_id_fkey" FOREIGN KEY ("id") REFERENCES "Coordinates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
