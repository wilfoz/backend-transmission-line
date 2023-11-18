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
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "stage" VARCHAR(50) NOT NULL,
    "group" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
