export default function Views({views}: {views: number}) {

  const _views = String(views);

  return (
    <span>{`${_views} views`}</span>
  )
}