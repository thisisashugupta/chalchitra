function TagWrapper({label}: {label: string}) {
  return (
    <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-0.5xs font-semibold text-nowrap">{label}</button>
  )
}

export default TagWrapper