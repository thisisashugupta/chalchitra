"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Forward } from "lucide-react"

export default function Share({video_id}:{video_id: string}) {
  const { toast } = useToast();

  // if (!video_id) return null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const text = `${BASE_URL}/watch?v=${video_id}`;

  function copyToClipboard() {
    navigator.clipboard.writeText(text)
        .then(() => {
            toast({ title: 'Copied to clipboard!' })
        })
        .catch((error) => {
            console.error('Unable to copy to clipboard:', error);
            toast({ title: 'Failed to copy to clipboard' })
        });
  }
  
  return (
      <Dialog>
        <DialogTrigger>
          <div className="flex rounded-full px-3 py-2 bg-gray-200 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600/70">
            <Forward strokeWidth={1} size={20} />
            <p className="ml-2 text-0.5xs">Share</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription className="flex gap-2">
              <input type="text" value={text} readOnly className="w-full p-2" />
              <button className="bg-black hover:bg-gray-800 focus:bg-gray-500 rounded-full py-2 px-4 text-white" onClick={copyToClipboard}>Copy</button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}