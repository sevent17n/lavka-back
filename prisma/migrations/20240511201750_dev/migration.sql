/*
  Warnings:

  - You are about to drop the column `productsId` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_productsId_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "categoryId" INTEGER;

-- AlterTable
ALTER TABLE "category" DROP COLUMN "productsId";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
