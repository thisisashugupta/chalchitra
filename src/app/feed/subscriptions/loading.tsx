import DisplayInGrid from '@/components/ui/display-in-grid'
import VideoCardVerticalSkeleton from '@/components/ui/skeletons/VideoCardVerticalSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function loading() {
    
    return (<div className="m-4 flex justify-center">
    <div className='max-w-7xl w-full'>
      <div className="mx-12 mb-4 rounded-full p-2 space-x-2 bg-blue-500/50 flex justify-between">
          <div className="w-full text-center">
              <Skeleton className="h-10 p-2 rounded-full" />
          </div>
          <div className="w-full text-center">
              <Skeleton className="h-10 p-2 rounded-full bg-blue-500" />
          </div>
      </div>

      <div>
        <DisplayInGrid>
            {
                Array.from({length: 10}).map((_, i) =>
                    <div key={i}>
                        <VideoCardVerticalSkeleton />
                    </div>
                )
                
            }
        </DisplayInGrid>
    </div>
      
    </div>
</div>)

}