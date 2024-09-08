/*
  Warnings:

  - Added the required column `expecteddeliverdate` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderdate` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderedtime` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventory" ADD COLUMN     "description" TEXT,
ADD COLUMN     "expecteddeliverdate" DATE NOT NULL,
ADD COLUMN     "orderdate" DATE NOT NULL,
ADD COLUMN     "orderedtime" TEXT NOT NULL,
ADD COLUMN     "supplier" TEXT;
