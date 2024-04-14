import React from 'react'

function Views({views}: {views: string}) {

    const _views = String(views);

  return (
    <span>{`${_views} views`}</span>
  )
}

export default Views
