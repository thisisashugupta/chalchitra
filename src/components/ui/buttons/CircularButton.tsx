export default function CircularButton({title}: {title: string}) {
    return (
        <div className='px-[0.6rem] py-[0.3rem] flex text-blue-500 text-sm border border-gray-700 rounded-full hover:bg-blue-400/50'>
            <p className='mx-1 font-semibold'>{title}</p>
        </div>
    )
}
