import { Star } from "lucide-react";
import Carousel from "react-multi-carousel";

export default function Review() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="pb-10">
      <h3 className="text-2xl font-semibold mb-4">What people loved about this freelancer</h3>
      <Carousel className="review py-6" responsive={responsive} showDots={true} ssr={true}>
        <div className="rounded shadow-sm gap-4 flex items-center p-4  w-full h-[140px] ">
          <img className="min-w-12 h-12 bg-black rounded-full" />
          <div className="w-fit flex flex-col gap-1">
            <div className="flex">
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500" />
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reiciendis amet adipisci hic. Ad, amet ipsam reprehenderit magni
              vero rem eaque quibusdam deserunt ratione esse vel saepe. Eum
              repellendus laudantium odio?
            </p>
          </div>
        </div>
        <div className="rounded shadow-sm gap-4 flex items-center p-4 w-full h-[140px] ">
          <img className="min-w-12 h-12 bg-black rounded-full" />
          <div className="w-fit flex flex-col gap-1">
            <div className="flex">
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500" />
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reiciendis amet adipisci hic. Ad, amet ipsam reprehenderit magni
              vero rem eaque quibusdam deserunt ratione esse vel saepe. Eum
              repellendus laudantium odio?
            </p>
          </div>
        </div>
        <div className="rounded shadow-sm gap-4 flex items-center p-4 w-full h-[140px] ">
          <img className="min-w-12 h-12 bg-black rounded-full" />
          <div className="w-fit flex flex-col gap-1">
            <div className="flex">
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <Star size={18} className="text-yellow-500" />
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reiciendis amet adipisci hic. Ad, amet ipsam reprehenderit magni
              vero rem eaque quibusdam deserunt ratione esse vel saepe. Eum
              repellendus laudantium odio?
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
