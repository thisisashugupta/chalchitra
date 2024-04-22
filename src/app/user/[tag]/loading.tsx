"use server"
import Spinner from "@/components/ui/spinner"

export default async function Loading() {
  return (
    <div className='p-16 flex flex-col items-center justify-center'>
        <Spinner />
        <p className="mt-4 font-semibold text-3xl">Loading...</p>
    </div>
  )
}