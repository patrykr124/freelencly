import { Link } from "react-router-dom"


interface props {
  title: string,
  icon?: React.ReactNode,
  href: string
  
}
export default function Box({ title, icon, href }: props) {
  return (
    <Link to={href} className="w-[140px] h-[125px] shadow-md rounded-xl p-2 flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-black/2">
      {icon}
      <p className="font-semibold text-sm text-center">{title}</p>
    </Link>
  )
}