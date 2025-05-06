import Filter from "../components/layout/services/Filter";
import Header from "../components/UI/Header";
import { useJobs } from "../lib/useAllJobs";
import { BoxServicesProps } from "@/types/box_services_props";
import BoxServices from "../components/layout/services/BoxServices";
import { useParams } from "react-router-dom";

export default function ServicesPage() {
  const { data: jobs } = useJobs();
  const { category } = useParams();
  const filteredJobs = jobs?.filter(
    (job: BoxServicesProps) => job.category === category
  );
  console.log(filteredJobs);

  return (
    <>
      <Header title={`${category}`} img="/img/webdev.jpg" />
      <div className="wrapper">
        {filteredJobs?.length > 0 && (
          <div className="py-12">
            <Filter />
          </div>
        )}
        {filteredJobs?.length === 0 && (
          <p className="text-center mt-20">--No jobs found--</p>
        )}
        <div className="grid  grid-cols-3 gap-8">
          {filteredJobs?.map((item: BoxServicesProps) => (
            <BoxServices
              key={item.id}
              id={item.id}
              category={item.category}
              img={item.img}
              title={item.title}
              packages={item.packages}
              postedBy={item.postedBy}
            />
          ))}
        </div>
      </div>
    </>
  );
}
