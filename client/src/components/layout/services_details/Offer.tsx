import { Job } from "@/types/box_services_props";
import { useState } from "react";

export default function Offer({ job }: Job) {
  const [active, setActive] = useState<number>(1);
  const data = job.packages;
  console.log(data);
  return (
    <div className="border-[1px] -mt-40 z-[999999] bg-white shadow-xl border-black/20 rounded-md min-h-[310px] sticky top-28 overflow-hidden">
      <div className="flex items-center justify-around">
        <div
          onClick={() => setActive(1)}
          className={`border-[1px] w-full p-4 flex justify-center ${
            active === 1 ? "shadow-sm" : "bg-black/10"
          } `}
        >
          <p>BASIC</p>
        </div>
        <div
          onClick={() => setActive(2)}
          className={`border-[1px] w-full p-4 flex justify-center ${
            active === 2 ? "shadow-sm" : "bg-black/10"
          } `}
        >
          <p>STANDARD</p>
        </div>
        <div
          onClick={() => setActive(3)}
          className={`border-[1px] w-full p-4 flex justify-center ${
            active === 3 ? "shadow-sm" : "bg-black/10"
          } `}
        >
          <p>PREMIUM</p>
        </div>
      </div>
      <div className="p-4 justify-center  mt-4 relative flex h-[250px] ">
        {active === 1 && (
          <div className="flex  gap-5  flex-col justify-center w-full h-full">
            <div className="desc">
              <p>{data[0]?.description}</p>
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
            <button className="link bg-black text-white">Send a order</button>
          </div>
        )}
        {active === 2 && (
          <div className="flex  gap-5   flex-col justify-center w-full h-full">
            <div className="desc">
              <p>{data[1]?.description}</p>
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
            <button className="link bg-black text-white">Send a order</button>
          </div>
        )}
        {active === 3 && (
          <div className="flex  gap-5   flex-col justify-center w-full h-full">
            <div className="desc">
              <p>{data[2]?.description}</p>
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
            <button className="link bg-black text-white">Send a order</button>
          </div>
        )}
      </div>
    </div>
  );
}
