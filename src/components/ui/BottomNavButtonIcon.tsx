export default function Icon({children}: React.PropsWithChildren<{}>) {
    return (
        <div className='p-1 pt-2 w-full w-20 flex flex-col items-center text-2xs'>
            {children}
        </div>
    )
}