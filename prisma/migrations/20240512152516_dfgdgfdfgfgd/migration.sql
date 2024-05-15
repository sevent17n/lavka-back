/*
  Warnings:

  - You are about to drop the column `products` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "products";

-- CreateTable
CREATE TABLE "Orders_Data" (
    "id" SERIAL NOT NULL,
    "ordersId" INTEGER NOT NULL,
    "productsId" INTEGER NOT NULL,

    CONSTRAINT "Orders_Data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders_Data" ADD CONSTRAINT "Orders_Data_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders_Data" ADD CONSTRAINT "Orders_Data_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
