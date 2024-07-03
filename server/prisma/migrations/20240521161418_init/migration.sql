-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_author_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_belongto_fkey";

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "belongto" DROP NOT NULL,
ALTER COLUMN "author" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_belongto_fkey" FOREIGN KEY ("belongto") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
