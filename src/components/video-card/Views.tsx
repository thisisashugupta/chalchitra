import { formatNumber } from '@/lib/number';

export default function Views({views}: {views: number}) {

  let viewsInShort = formatNumber(views);
  if (!views) viewsInShort = "0";
  
  return (
    <span>{`${viewsInShort} views`}</span>
  )
}