import { Mic } from 'lucide-react'

function VoiceButton() {
  return (
    <div className='ml-4'>
      <div className='p-[0.55rem] rounded-full aspect-square bg-gray-200/70 hover:bg-gray-300'><Mic size={22} strokeWidth={1.3} /></div>
    </div>
  )
}

export default VoiceButton
