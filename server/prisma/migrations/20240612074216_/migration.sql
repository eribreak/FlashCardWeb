/*
  Warnings:

  - Added the required column `byMemberId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "byMemberId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_byMemberId_fkey" FOREIGN KEY ("byMemberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
