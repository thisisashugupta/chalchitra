import Image from 'next/image'

function CreateVideo() {
  return (
    // m-[0.4rem] hover:bg-gray-300/70 dark:hover:bg-gray-300/30 rounded-full
    <div className='p-[0.4rem] hover:bg-gray-300/70 dark:hover:bg-gray-300/30 rounded-full'>
        <Image
            className='dark:invert'
            src="/icons/video-plus.svg"
            alt="Create Video"
            width={24}
            height={24}
            priority
        />
    </div>

  )
}

export default CreateVideo
