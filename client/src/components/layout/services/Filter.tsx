import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { technologyData } from "../../../lib/Technology";
export default function Filter() {
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
                {technologyData.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-black/5 p-2 rounded-2xl w-[150px]">
                        <div className="text-4xl">{item.icon}</div>
                        <p>{item.name}</p>
                    </div>
                ))}
            </Carousel>

        </section>
    )
}