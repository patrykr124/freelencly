import Header from "../components/UI/Header";
import { useParams } from "react-router-dom";
import { useCurrentJobs } from "../lib/useCurrentJob";
import Avatar from "../components/layout/services_details/Avatar";
import Review from "../components/layout/services_details/Review";
import Offer from "../components/layout/services_details/Offer";
import Loading from "../components/UI/Loading";

export default function ServicesPageDetail() {
  const { id } = useParams();
  const { data: job, isLoading } = useCurrentJobs(id);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-screen flex flex-col item-center justify-center bg-white">
          <Loading/>
        </div>
      ) : (
        <div>
          <Header title="" img={`http://localhost:3000/uploads/${job?.img}`} />
          <div className="wrapper details grid grid-cols-3 gap-12 py-20 ">
            <div className="col-span-2 gap-6 flex flex-col ">
              <Avatar job={job} />
              <h2 className="text-4xl font-semibold mt-8">{job?.title}</h2>
              <div className=""></div>
              <div className="review">
                <Review />
              </div>
              <div className="">
                <div dangerouslySetInnerHTML={{ __html: job?.description }} />
              </div>
            </div>
            <div className="relative">
              <Offer job={job} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
