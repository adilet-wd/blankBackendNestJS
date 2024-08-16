/*
  Warnings:

  - You are about to drop the column `attributes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Product` table. All the data in the column will be lost.
  - Added the required column `expiration_date` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pulbication_date` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'PARTNER';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "attributes",
DROP COLUMN "date",
ADD COLUMN     "expiration_date" TEXT NOT NULL,
ADD COLUMN     "pulbication_date" TEXT NOT NULL;
