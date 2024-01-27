/*
  Warnings:

  - You are about to drop the column `url` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "url",
ADD COLUMN     "video_id" VARCHAR(255) NOT NULL DEFAULT 'e32101b3954cabcdc874cd0ddc3c5dad';
