interface Props {
    children : React.ReactNode,
    color:string,
    onClick?: () => void
}


export default function Button({children, color,onClick}: Props) {
  return (
    <button onClick={onClick} className={` ${color} min-w-[120px] px-6 rounded-md  text-center py-1.5 shadow-sm hover:scale-95 transition-all duration-200 cursor-pointer `}>{children}</button>
  )
}