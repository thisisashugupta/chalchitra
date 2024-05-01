import { Skeleton } from '@/components/ui/skeleton'

export default function ShowSubscribeSkeleton() {
  return (
    <Skeleton className="rounded-full px-4 py-2">
        <div className="text-transparent text-sm font-semibold">Subscribed</div>
    </Skeleton>
  )
}
