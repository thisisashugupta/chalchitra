function TagWrapper({label}: {label: string}) {
  return (
    <button className="bg-gray-300/50 hover:bg-gray-400/50 px-3 py-2 rounded-lg text-0.5xs font-semibold text-nowrap">{label}</button>
  )
}

export default TagWrapper