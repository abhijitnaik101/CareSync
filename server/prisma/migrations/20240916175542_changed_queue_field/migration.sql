-- AlterTable
ALTER TABLE "queue" ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "pending" SET DEFAULT true;
