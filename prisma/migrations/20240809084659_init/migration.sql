-- CreateTable
CREATE TABLE "Filter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "brand_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "inn" INTEGER NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "socials" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "type_of_activity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);
