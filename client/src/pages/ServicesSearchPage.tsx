import Filter from "../components/layout/services/Filter";
import Header from "../components/UI/Header";
import { useJobs } from "../lib/useAllJobs";
import { BoxServicesProps } from "@/types/box_services_props";
import BoxServices from "../components/layout/services/BoxServices";
import { useSearchParams } from "react-router-dom";
import { useSearchTitleStore } from "../store/useSearchTitle";



export default function ServicesSearchPage() {
  const { data: jobs } = useJobs();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const selectedTitle = useSearchTitleStore((state) => state.selectedTitle)
  const filteredJobs = jobs?.filter(
    (job: BoxServicesProps) => job.title.toLowerCase().includes(query)
  );

 

  return (
    <>
      <Header title={selectedTitle ? selectedTitle : query} img="/img/webdev.jpg" />
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
