-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wardId" INTEGER;

-- CreateTable
CREATE TABLE "ward" (
    "id" SERIAL NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "totalBeds" INTEGER NOT NULL,
    "occupiedBeds" INTEGER NOT NULL,
    "availableBeds" INTEGER NOT NULL,

    CONSTRAINT "ward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "ward"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ward" ADD CONSTRAINT "ward_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
