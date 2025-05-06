import useAuth from "../../../store/auth";
import { useManagmentTask } from "../../../lib/useManagmentTask";
import { Job } from "@/types/box_services_props";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Offer({ job }: Job) {
  const [active, setActive] = useState<number>(1);
  const data = job.packages;
  const navigate = useNavigate();
  const { token } = useAuth();
  const managmentFreelencer = useManagmentTask(token ?? "");
  function handleManagmentFreelencer() {
    managmentFreelencer.mutate(
      {
        userId: job.postedBy.id,
      },
      {
        onSuccess: (data) => {
          if (data && data.id) {
            navigate(`/project/${job.id}`);
          }
          console.log(data);
          navigate(`/project/${job.id}`);
        },

        onError: (error) => {
          console.error("Błąd w create.tsx", error);
        },
      }
    );
  }

  const cssBox = " flex gap-3  flex-col justify-between w-full h-full min-h-[150px] ";

  return (
    <div className="">
      <div className="rounded overflow-hidden -mt-40 z-[9] bg-white  min-h-[200px] sticky top-20 ">
        <div className="flex items-center justify-around">
          <div
            onClick={() => setActive(1)}
            className={`border-[1px] w-full cursor-pointer p-4 flex justify-center ${
              active === 1 ? "shadow-sm" : "bg-black/10"
            } `}
          >
            <p>BASIC</p>
          </div>
          <div
            onClick={() => setActive(2)}
            className={`border-[1px] w-full cursor-pointer p-4 flex justify-center ${
              active === 2 ? "shadow-sm" : "bg-black/10"
            } `}
          >
            <p>STANDARD</p>
          </div>
          <div
            onClick={() => setActive(3)}
            className={`border-[1px] w-full cursor-pointer p-4 flex justify-center ${
              active === 3 ? "shadow-sm" : "bg-black/10"
            } `}
          >
            <p>PREMIUM</p>
          </div>
        </div>
        <div className="p-3 justify-center   mt-2 relative flex flex-col min-h-[150px] ">
          {active === 1 && (
            <div className={`${cssBox}`}>
              <div className="desc">
                <p className="whitespace-pre-line overflow-y-auto max-h-[360px] ">
                  {data[0]?.description}
                </p>
              </div>
              <hr />
              <div className="flex justify-between">
                <div className="rev">
                  <p>Revisions: {data[0]?.revisions}</p>
                </div>
                <div className="price">
                  <p className="font-semibold text-end text-xl">
                    {data[0]?.price} zł
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center flex-col gap-1.5">
                <button className="link bg-black text-white">
                  Send a message
                </button>
              </div>
            </div>
          )}
          {active === 2 && (
            <div className={`${cssBox}`}>
              <div className="desc">
                <p className="whitespace-pre-line overflow-y-auto max-h-[360px]">
                  {data[1]?.description}
                </p>
              </div>
              <hr />
              <div className="flex justify-between">
                <div className="rev">
                  <p>Revisions: {data[1]?.revisions}</p>
                </div>
                <div className="price">
                  <p className="font-semibold text-end text-xl">
                    {data[1]?.price} zł
                  </p>
                </div>
              </div>
              <button className="link bg-black text-white">
                Send a message
              </button>
            </div>
          )}
          {active === 3 && (
            <div className={`${cssBox}`}>
              <div className="desc">
                <p className="whitespace-pre-line overflow-y-auto max-h-[360px]">
                  {data[2]?.description}
                </p>
              </div>
              <hr />
              <div className="flex justify-between">
                <div className="rev">
                  <p>Revisions: {data[2]?.revisions}</p>
                </div>
                <div className="price">
                  <p className="font-semibold text-end text-xl">
                    {data[2]?.price} zł
                  </p>
                </div>
              </div>
              <button className="link bg-black text-white">
                Send a message
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="border-[1px] p-2  bg-white shadow-xl border-black/20 rounded-md sticky mt-2 ">
        {job?.taskPerHours[0] && (
          <>
            <button
              onClick={() => {
                handleManagmentFreelencer();
              }}
              className="link w-full bg-black text-white"
            >
              {job.taskPerHours[0] && job.taskPerHours[0].hourlyRate} zł/h
            </button>
            <p className="text-xs  p-1.5">
              if you select the hourly option, you will be taken to a page for
              managing shuffles with your freelancer.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
