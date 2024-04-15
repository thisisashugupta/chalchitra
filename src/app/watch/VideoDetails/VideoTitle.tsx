import React from 'react'

function VideoTitle({title}: {title: string | undefined}) {
  return (
    <p className='text-lg font-bold'>{title}</p>
  )
}

export default VideoTitle
