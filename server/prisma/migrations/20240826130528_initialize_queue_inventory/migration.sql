/*
  Warnings:

  - You are about to drop the column `specialties` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the `reception` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specialty` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workingdays` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "gender" AS ENUM ('MALE', 'FEMALE', 'TRANS');

-- DropForeignKey
ALTER TABLE "patient" DROP CONSTRAINT "patient_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "reception" DROP CONSTRAINT "reception_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "reception" DROP CONSTRAINT "reception_patientId_fkey";

-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "specialties",
ADD COLUMN     "averageTreatmentTime" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "descripton" TEXT,
ADD COLUMN     "specialty" TEXT NOT NULL,
ADD COLUMN     "workingdays" INTEGER NOT NULL,
ADD COLUMN     "workinghrs" TEXT;

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "contact" TEXT NOT NULL,
ALTER COLUMN "hospitalId" DROP NOT NULL;

-- DropTable
DROP TABLE "reception";

-- CreateTable
CREATE TABLE "receptionist" (
    "id" SERIAL NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receptionist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "gender" NOT NULL,
    "appointType" "appointType" NOT NULL,
    "doctorId" INTEGER,
    "patientId" INTEGER,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mfgdate" DATE NOT NULL,
    "expDate" DATE NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queue" (
    "id" SERIAL NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "appointmentDate" DATE NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "futureReference" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "futureAppointmentDate" DATE NOT NULL,
    "notes" TEXT,

    CONSTRAINT "futureReference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "receptionist_email_key" ON "receptionist"("email");

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receptionist" ADD CONSTRAINT "receptionist_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue" ADD CONSTRAINT "queue_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue" ADD CONSTRAINT "queue_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue" ADD CONSTRAINT "queue_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "futureReference" ADD CONSTRAINT "futureReference_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "futureReference" ADD CONSTRAINT "futureReference_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
