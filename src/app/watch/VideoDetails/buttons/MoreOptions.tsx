import { MoreHorizontal } from "lucide-react"

export default function MoreOptions() {
    return (
        <button className="flex rounded-full p-2 bg-gray-200 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600/70">
            <MoreHorizontal strokeWidth={1} size={20} />
        </button>
    )
}