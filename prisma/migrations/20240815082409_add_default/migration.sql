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
    "inn" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "socials" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "type_of_activity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "attributes" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "Partner_brand_name_key" ON "Partner"("brand_name");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_key" ON "Attribute"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_Value_attribute_id_value_key" ON "Attribute_Value"("attribute_id", "value");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute_Value" ADD CONSTRAINT "Attribute_Value_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Attributes" ADD CONSTRAINT "Product_Attributes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Attributes" ADD CONSTRAINT "Product_Attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Attributes" ADD CONSTRAINT "Product_Attributes_value_id_fkey" FOREIGN KEY ("value_id") REFERENCES "Attribute_Value"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
