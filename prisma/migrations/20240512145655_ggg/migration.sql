/*
  Warnings:

  - You are about to drop the column `products` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "products";

-- CreateTable
CREATE TABLE "category_products" (
    "id" SERIAL NOT NULL,
    "productsId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "category_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_products" ADD CONSTRAINT "category_products_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_products" ADD CONSTRAINT "category_products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
