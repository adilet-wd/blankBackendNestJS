-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "characteristics" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
