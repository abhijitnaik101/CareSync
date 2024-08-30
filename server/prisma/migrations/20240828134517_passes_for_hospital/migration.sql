/*
  Warnings:

  - Added the required column `adminPass` to the `hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorPass` to the `hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryPass` to the `hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receptionistPass` to the `hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hospital" ADD COLUMN     "adminPass" TEXT NOT NULL,
ADD COLUMN     "doctorPass" TEXT NOT NULL,
ADD COLUMN     "inventoryPass" TEXT NOT NULL,
ADD COLUMN     "receptionistPass" TEXT NOT NULL;
