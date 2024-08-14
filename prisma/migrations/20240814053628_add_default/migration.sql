/*
  Warnings:

  - You are about to drop the `Attributes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attribute_Value" DROP CONSTRAINT "Attribute_Value_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "Product_Attributes" DROP CONSTRAINT "Product_Attributes_attribute_id_fkey";

-- DropTable
DROP TABLE "Attributes";

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attribute_Value" ADD CONSTRAINT "Attribute_Value_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Attributes" ADD CONSTRAINT "Product_Attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
