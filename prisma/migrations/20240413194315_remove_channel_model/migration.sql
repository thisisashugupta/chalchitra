/*
  Warnings:

  - You are about to drop the column `channelId` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChannelSubscriptions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tag]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_channelId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_channelId_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelSubscriptions" DROP CONSTRAINT "_ChannelSubscriptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelSubscriptions" DROP CONSTRAINT "_ChannelSubscriptions_B_fkey";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "channelId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "total_subscribers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_videos" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "channelId";

-- DropTable
DROP TABLE "Channel";

-- DropTable
DROP TABLE "_ChannelSubscriptions";

-- CreateTable
CREATE TABLE "_Subscriptions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Subscriptions_AB_unique" ON "_Subscriptions"("A", "B");

-- CreateIndex
CREATE INDEX "_Subscriptions_B_index" ON "_Subscriptions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_tag_key" ON "User"("tag");

-- AddForeignKey
ALTER TABLE "_Subscriptions" ADD CONSTRAINT "_Subscriptions_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Subscriptions" ADD CONSTRAINT "_Subscriptions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
