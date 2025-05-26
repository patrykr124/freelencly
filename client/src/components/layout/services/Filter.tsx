import { Technology } from "@/types/box_services_props";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface FilterProps {
    onSelect: (technology: string) => void;
    technologyAll: Technology[];
}

export default function Filter({onSelect, technologyAll}: FilterProps ) {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };
   
    return (
        <section className="">

            <Carousel className="px-2" responsive={responsive} ssr={true}>
                {technologyAll.map((item) => (
                    <div onClick={() => onSelect(item.name)} key={item.id} className="flex cursor-pointer hover:bg-black/15 transition-all duration-200 items-center gap-4 bg-black/5 p-2 rounded-2xl h-[50px] w-[150px]">
                        <div className="text-4xl">{item.icon}</div>
                        <p>{item.name}</p>
                    </div>
                ))}
            </Carousel>

        </section>
    )
}