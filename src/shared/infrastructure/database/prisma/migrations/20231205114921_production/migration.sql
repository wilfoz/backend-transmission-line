/*
  Warnings:

  - You are about to drop the `_EmployeeToTeam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EquipmentToTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EmployeeToTeam" DROP CONSTRAINT "_EmployeeToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeToTeam" DROP CONSTRAINT "_EmployeeToTeam_B_fkey";

-- DropForeignKey
ALTER TABLE "_EquipmentToTeam" DROP CONSTRAINT "_EquipmentToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_EquipmentToTeam" DROP CONSTRAINT "_EquipmentToTeam_B_fkey";

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "teamId" UUID;

-- AlterTable
ALTER TABLE "equipments" ADD COLUMN     "teamId" UUID;

-- DropTable
DROP TABLE "_EmployeeToTeam";

-- DropTable
DROP TABLE "_EquipmentToTeam";

-- CreateTable
CREATE TABLE "productions" (
    "id" UUID NOT NULL,
    "status" "STATUS_PRODUCTION" NOT NULL DEFAULT 'PROGRAMADO',
    "comments" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "finalTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" UUID NOT NULL,

    CONSTRAINT "productions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductionToTower" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductionToTeam" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "productions_taskId_key" ON "productions"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductionToTower_AB_unique" ON "_ProductionToTower"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductionToTower_B_index" ON "_ProductionToTower"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductionToTeam_AB_unique" ON "_ProductionToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductionToTeam_B_index" ON "_ProductionToTeam"("B");

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productions" ADD CONSTRAINT "productions_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductionToTower" ADD CONSTRAINT "_ProductionToTower_A_fkey" FOREIGN KEY ("A") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductionToTower" ADD CONSTRAINT "_ProductionToTower_B_fkey" FOREIGN KEY ("B") REFERENCES "towers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductionToTeam" ADD CONSTRAINT "_ProductionToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductionToTeam" ADD CONSTRAINT "_ProductionToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
