import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowDownToLine } from "lucide-react"

export default function Download({video_id}:{video_id: string}) {
  if (!video_id) return null;
  
  return (
      <Dialog>
        <DialogTrigger>
          <div className="flex bg-gray-200 rounded-full p-2 hover:bg-gray-300">
            <ArrowDownToLine strokeWidth={1} size={20} />
            <p className="ml-2 text-0.5xs">Download</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download</DialogTitle>
            <DialogDescription>
                Premium Feature. Will be added later.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}