import { BsSearch } from "react-icons/bs";

export default function Header() {

    const imageData = [
        {
            id: 1,
            href: "/img/1.svg"
        },
        {
            id: 2,
            href: "/img/2.svg"
        },
        {
            id: 3,
            href: "/img/3.svg"
        },
        {
            id: 4,
            href: "/img/4.svg"
        },
        {
            id: 5,
            href: "/img/5.svg"
        },
        {
            id: 6,
            href: "/img/6.svg"
        }
    ]
  return (
    <section className="relative h-[80vh] w-full flex   ">
    <video autoPlay muted loop playsInline className="absolute object-cover top-0 left-0 w-full h-full -scale-x-100 z-0">
        <source src="/header.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <div className="text-white  z-20  wrapper flex flex-col h-full w-full justify-end py-8">
        <div className="mb-56 flex flex-col gap-10">
            <div className="text-6xl">
                <h1 className="">Find help on Freelencly!</h1>
                <h2 className="">Meet your commitments!</h2>
                <h2 className="text-xl mt-8 ml-1.5">Freereners from around the world with a 24-hour planning system</h2>
            </div>
            <div className="relative bg-white w-1/2 rounded-lg">
                <input className="outline-none text-black w-full border-none  px-4 py-3 rounded-2xl" placeholder="Search in your location" />
                <div className=" absolute top-[50%] translate-y-[-50%] right-1.5 bg-black hover:bg-black/85 transition-all duration-200 cursor-pointer  p-3 rounded-lg">
                   <BsSearch size={20} color="white"/>
                </div>
            </div>
        </div>

        <div className="logo flex gap-10 ">
            <p>Trusted us:</p>
            <div className="flex gap-12">
                {imageData.map((item) => (
                    <img src={item.href} key={item.id} />
                )
                )}
            </div>
        </div>
    </div>
</section>
  )
}