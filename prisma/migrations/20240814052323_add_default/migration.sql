/*
  Warnings:

  - You are about to drop the column `characteristics` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Characteristics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Characteristics_Value` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_Characteristics` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attributes` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Characteristics_Value" DROP CONSTRAINT "Characteristics_Value_characteristics_id_fkey";

-- DropForeignKey
ALTER TABLE "Product_Characteristics" DROP CONSTRAINT "Product_Characteristics_characteristics_id_fkey";

-- DropForeignKey
ALTER TABLE "Product_Characteristics" DROP CONSTRAINT "Product_Characteristics_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Product_Characteristics" DROP CONSTRAINT "Product_Characteristics_value_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "characteristics",
ADD COLUMN     "attributes" TEXT NOT NULL;

-- DropTable
DROP TABLE "Characteristics";

-- DropTable
DROP TABLE "Characteristics_Value";

-- DropTable
DROP TABLE "Product_Characteristics";

-- CreateTable
CREATE TABLE "Attributes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute_Value" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "attribute_id" INTEGER NOT NULL,

    CONSTRAINT "Attribute_Value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Attributes" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,
    "value_id" INTEGER NOT NULL,

    CONSTRAINT "Product_Attributes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attribute_Value" ADD CONSTRAINT "Attribute_Value_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Attributes" ADD CONSTRAINT "Product_Attributes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Attributes" ADD CONSTRAINT "Product_Attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Attributes" ADD CONSTRAINT "Product_Attributes_value_id_fkey" FOREIGN KEY ("value_id") REFERENCES "Attribute_Value"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
