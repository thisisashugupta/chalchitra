"use server"

import CardSkeleton from "@/components/CardSkeleton"

const videos = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: "title",
  name: "name",
}));

export default async function SuggestionsSkeleton() {

  return (
    <div className="md:mx-4 md:my-6 flex">
    <div className="w-full grid grid-cols-1">
        {videos.map((video) => (
            <div key={video.id} className='md:mx-2 mb-6'>
                <CardSkeleton />
            </div>
        ))}
    </div>
    </div>
  );
}