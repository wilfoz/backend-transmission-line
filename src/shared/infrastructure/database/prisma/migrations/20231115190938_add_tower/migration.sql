-- CreateTable
CREATE TABLE "towers" (
    "id" UUID NOT NULL,
    "code" INTEGER NOT NULL,
    "tower" VARCHAR(20) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "coordinates" JSON NOT NULL,
    "distance" INTEGER,
    "height" INTEGER,
    "weight" INTEGER,
    "type_of_foundation_A" VARCHAR(20),
    "type_of_foundation_B" VARCHAR(20),
    "type_of_foundation_C" VARCHAR(20),
    "type_of_foundation_D" VARCHAR(20),
    "type_of_foundation_MC" VARCHAR(20),
    "embargo" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "towers_pkey" PRIMARY KEY ("id")
);
