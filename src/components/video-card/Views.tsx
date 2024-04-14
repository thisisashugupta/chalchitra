import { formatNumber } from '@/lib/number';

export default function Views({views}: {views: number}) {
  const viewsInShort = formatNumber(views);
  
  return (
    <span>{`${viewsInShort} views`}</span>
  )
}