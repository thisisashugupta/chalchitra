/*
  Warnings:

  - A unique constraint covering the columns `[video_id]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Video_video_id_key" ON "Video"("video_id");
