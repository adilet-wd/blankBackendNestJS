-- CreateTable
CREATE TABLE "Characteristics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characteristics_Value" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "characteristics_id" INTEGER NOT NULL,

    CONSTRAINT "Characteristics_Value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Characteristics" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "characteristics_id" INTEGER NOT NULL,
    "value_id" INTEGER NOT NULL,

    CONSTRAINT "Product_Characteristics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Characteristics_Value" ADD CONSTRAINT "Characteristics_Value_characteristics_id_fkey" FOREIGN KEY ("characteristics_id") REFERENCES "Characteristics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Characteristics" ADD CONSTRAINT "Product_Characteristics_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Characteristics" ADD CONSTRAINT "Product_Characteristics_characteristics_id_fkey" FOREIGN KEY ("characteristics_id") REFERENCES "Characteristics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Characteristics" ADD CONSTRAINT "Product_Characteristics_value_id_fkey" FOREIGN KEY ("value_id") REFERENCES "Characteristics_Value"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
