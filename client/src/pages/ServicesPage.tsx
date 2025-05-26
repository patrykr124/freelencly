import Filter from "../components/layout/services/Filter";
import Header from "../components/UI/Header";
import { useJobs } from "../lib/useAllJobs";
import { BoxServicesProps } from "@/types/box_services_props";
import BoxServices from "../components/layout/services/BoxServices";
import { useParams } from "react-router-dom";
import { useQueryJob } from "../lib/useQueryJob";
import { useState } from "react";
import Loading from "../components/UI/Loading";
import { technologyData } from "../lib/Technology";

export default function ServicesPage() {
  const { data: jobs } = useJobs();
  const { category } = useParams();
  const filteredJobs = jobs?.filter(
    (job: BoxServicesProps) => job.category === category
  );

  const [selectedTechnology, setSelectedTechnology] = useState<
    string | undefined
  >(undefined);
  const { data: queryJob, isLoading, error } = useQueryJob(selectedTechnology);
  const jobsToShow = selectedTechnology ? queryJob : filteredJobs;
  const filteredTechnology = technologyData.filter((item) =>
    item.categories.includes(category || "")
  );
  return (
    <>
      <Header title={`${category}`} img="/img/webdev.jpg" />
      <div className="wrapper">
        <div className="py-12">
          <Filter
            technologyAll={filteredTechnology}
            onSelect={setSelectedTechnology}
          />
        </div>

        {jobsToShow?.length === 0 && (
          <p className="text-center mt-20">--No jobs found--</p>
        )}
        {isLoading && <Loading />}
        {error && <p className="text-center mt-20">error</p>}
        <div className="grid  grid-cols-3 gap-8">
          {jobsToShow?.map((item: BoxServicesProps) => (
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
