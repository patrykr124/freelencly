interface props {
    img: string
    title:string
}
export default function Header({ img, title }: props) {
    return (
        <div className="h-[45vh] items-center justify-center w-screen flex relative">
            <img className="w-full absolute top-0 left-0 h-full object-cover" src={`${img}`} />
            <h1 className="z-20 text-5xl text-white text-center">{title}</h1>
            <div className="absolute top-0 left-0 h-full w-full bg-black/50" />
        </div>
    )
}