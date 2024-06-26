import {getElapsedTime} from '@/lib/time'

export default function UploadTime({createdAt}: {createdAt: Date | undefined}) {

  const timeago = getElapsedTime(createdAt?.toString() || '')

  return (
    <span>{`${timeago} ago`}</span>
  )
}
