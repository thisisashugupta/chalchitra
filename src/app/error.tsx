'use client' // Error components must be Client Components
 
import { useEffect } from 'react'

/*  error.tsx automatically creates an error boundary for the component
    meaning that if an error occurs in the nested components, the error boundary will catch it
    and display the fallback ui.
*/
 
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center p-16 font-semibold'>
      <p>src/app/error.tsx</p>
      <div className='text-xl text-red-500 font-mono m-6 p-6 pb-5 text-gray-600 bg-slate-200 border-2 border-red-500 rounded-xl'><p>{error.message || "Something went wrong."}</p></div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white hover:text-gray-300 font-bold py-2 px-4 rounded'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}