-- CreateEnum
CREATE TYPE "STATUS_EQUIPMENT" AS ENUM ('ACTIVE', 'MAINTENANCE', 'DEMOBILIZED');

-- CreateEnum
CREATE TYPE "STATUS_PRODUCTION" AS ENUM ('EXECUTADO', 'PROGRAMADO', 'ANDAMENTO');

-- CreateEnum
CREATE TYPE "STATUS_EMPLOYEE" AS ENUM ('ACTIVE', 'AWAY');

-- CreateEnum
CREATE TYPE "LEADERS" AS ENUM ('YES', 'NO');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "towers" (
    "id" UUID NOT NULL,
    "code" INTEGER NOT NULL,
    "tower" VARCHAR(20) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "coordinates" JSON NOT NULL,
    "distance" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "type_of_foundation_A" VARCHAR(20),
    "type_of_foundation_B" VARCHAR(20),
    "type_of_foundation_C" VARCHAR(20),
    "type_of_foundation_D" VARCHAR(20),
    "type_of_foundation_MC" VARCHAR(20),
    "embargo" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "towers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" UUID NOT NULL,
    "code" INTEGER NOT NULL,
    "stage" VARCHAR(50) NOT NULL,
    "group" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "id" UUID NOT NULL,
    "registration" VARCHAR(255) NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "status" "STATUS_EQUIPMENT" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL,
    "registration" VARCHAR(255) NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "occupation" VARCHAR(255) NOT NULL,
    "leadership" BOOLEAN NOT NULL,
    "status" "STATUS_EMPLOYEE" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EquipmentToTeam" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_EmployeeToTeam" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_key" ON "teams"("name");

-- CreateIndex
CREATE UNIQUE INDEX "equipments_licensePlate_key" ON "equipments"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "employees_fullName_key" ON "employees"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToTeam_AB_unique" ON "_EquipmentToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToTeam_B_index" ON "_EquipmentToTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToTeam_AB_unique" ON "_EmployeeToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToTeam_B_index" ON "_EmployeeToTeam"("B");

-- AddForeignKey
ALTER TABLE "_EquipmentToTeam" ADD CONSTRAINT "_EquipmentToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToTeam" ADD CONSTRAINT "_EquipmentToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToTeam" ADD CONSTRAINT "_EmployeeToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToTeam" ADD CONSTRAINT "_EmployeeToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
