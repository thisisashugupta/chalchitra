"use server"
import Loading from '@/components/Loading'
import CardSkeleton from "@/components/CardSkeleton"

const videos = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: "title",
  name: "name",
}));

export async function FeedSkeleton() {

  return (
    <div className="md:mx-4 md:my-6 flex">
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {videos.map((video) => (
          <div key={video.id} className='md:mx-2 mb-6'>
                <CardSkeleton />
            </div>
        ))}
    </div>
    </div>
  );
}

export default Loading