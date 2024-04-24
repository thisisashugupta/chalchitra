import { Mic } from 'lucide-react'

function VoiceButton() {
  return (
    <div className='p-[0.55rem] rounded-full aspect-square bg-gray-200/70 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-500/70'>
      <Mic size={22} strokeWidth={1.3} />
    </div>
  )
}

export default VoiceButton
