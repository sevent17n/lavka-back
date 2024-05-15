/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `ordersId` on the `Products` table. All the data in the column will be lost.
  - Added the required column `products` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `products` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_ordersId_fkey";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "products" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "categoryId",
DROP COLUMN "ordersId";

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "products" JSONB NOT NULL;
