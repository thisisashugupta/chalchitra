import CardSkeleton from "@/components/ui/skeletons/CardSkeleton"
import DisplayInGrid from "@/components/ui/display-in-grid"

export default function FeedSkeleton() {

  const videos = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: "title",
    name: "name",
  }))

  return (
      <DisplayInGrid>
      {videos.map((video) => (
        <div key={video.id} className='md:mx-2 mb-6'>
          <CardSkeleton />
        </div>
      ))}
      </DisplayInGrid>
  );
}