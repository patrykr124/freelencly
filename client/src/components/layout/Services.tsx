import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import { useJobs } from "../../lib/useAllJobs";
import { BoxServicesProps } from "@/types/box_services_props";
import BoxServices from "./services/BoxServices";
export default function Services() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 650 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 1,
    },
  };

  const { data: jobs, error } = useJobs();

  return (
    <section className="color wrapper py-20">
      <div className=" ">
        <h2>Recently Viewed & More</h2>
        {Array.isArray(jobs) && jobs.filter(Boolean).length > 0 && (
          <Carousel
            className="services_carousel py-10"
            responsive={responsive}
            showDots={true}
            ssr={true}
          >
            {jobs.map((item: BoxServicesProps) => (
              <BoxServices
                key={item.id}
                id={item.id}
                category={item.category}
                img={item.img}
                title={item.title}
                description={item.description}
                packages={item.packages}
                postedBy={item.postedBy}
              />
            ))}
            {error && <p>Dont have any offers</p>}
          </Carousel>
        )}
      </div>
      <div className="flex items-center justify-end">
        <Link className="link" to={"/services"}>
          Show more
        </Link>
      </div>
    </section>
  );
}
