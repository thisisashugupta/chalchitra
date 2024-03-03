export default function WatchButton({children}: {children: React.ReactNode}) {
    return (
        <button className="flex bg-gray-200 rounded-full p-2 hover:bg-gray-300">
            {children}
        </button>
    )
}