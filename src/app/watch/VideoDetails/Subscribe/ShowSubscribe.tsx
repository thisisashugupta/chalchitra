type ShowSubscribeProps = {
    subscribed?: boolean;
}
  
function ShowSubscribe({subscribed = false}: ShowSubscribeProps) {
  return (subscribed ? 
    <div className="bg-white dark:bg-gray-700 rounded-full px-4 py-2">
        <p className="text-black dark:text-white text-sm font-semibold">Subscribed</p>
    </div> :
    <div className="bg-black dark:bg-white rounded-full px-4 py-2">
        <p className="text-white dark:text-black text-sm font-semibold">Subscribe</p>
    </div>
  )
}
  
export default ShowSubscribe