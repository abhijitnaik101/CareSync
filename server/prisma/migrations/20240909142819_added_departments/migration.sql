/*
  Warnings:

  - You are about to drop the column `department` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `departmentId` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "department",
ADD COLUMN     "departmentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hospitalId" INTEGER NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
