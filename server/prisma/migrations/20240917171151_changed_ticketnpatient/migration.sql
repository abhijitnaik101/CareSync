/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentDate` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "gender" "gender" NOT NULL DEFAULT 'MALE',
ADD COLUMN     "profilePicture" TEXT;

-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "appointmentDate" DATE NOT NULL,
ADD COLUMN     "bloodtype" TEXT,
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "email" TEXT,
ALTER COLUMN "gender" SET DEFAULT 'MALE';

-- CreateIndex
CREATE UNIQUE INDEX "ticket_email_key" ON "ticket"("email");
