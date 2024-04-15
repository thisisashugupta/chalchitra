/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "photo" TEXT,
ADD COLUMN     "tag" TEXT NOT NULL,
ADD COLUMN     "total_videos" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "channelId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "channelId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_tag_key" ON "Channel"("tag");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
