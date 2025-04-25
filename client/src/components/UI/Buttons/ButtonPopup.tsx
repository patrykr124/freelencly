interface Props {
    children : React.ReactNode,
    color:string,
    onClick?: () => void
}


export default function ButtonPopup({children, color,onClick}: Props) {
  return (
    <button id="open-popup" onClick={onClick} className={` ${color} w-[100px] rounded-lg text-sm text-center py-1.5 shadow-sm hover:scale-95 transition-all duration-200 cursor-pointer `}>{children}</button>
  )
}