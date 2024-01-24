/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `foundations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "foundations_description_key" ON "foundations"("description");
