-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_playlistId_fkey";

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "url" VARCHAR(255) NOT NULL DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
ALTER COLUMN "playlistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
