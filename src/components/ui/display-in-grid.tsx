// display-in-grid.tsx
export default function DisplayInGrid({children}: {children: React.ReactNode}) {
  return (
    <div className={`
        grid grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        2xl:grid-cols-5 
        3xl:grid-cols-5 
        4xl:grid-cols-6
    `}>
        {children}
    </div>
  )
}