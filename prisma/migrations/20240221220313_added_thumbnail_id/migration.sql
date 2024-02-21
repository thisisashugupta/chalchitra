/*
  Warnings:

  - You are about to alter the column `video_id` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "thumbnail_id" VARCHAR(32) NOT NULL DEFAULT 'e00000b0000cabcdc000cd0ddc0c0dad',
ALTER COLUMN "video_id" SET DEFAULT 'e00000b0000cabcdc000cd0ddc0c0dad',
ALTER COLUMN "video_id" SET DATA TYPE VARCHAR(32);
