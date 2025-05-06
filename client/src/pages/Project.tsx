import TaskManager from "../components/layout/project/TaskManager";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { useState } from "react";
import { Freelancer } from "@/types/box_services_props";
import { useCurrentManagment } from "../lib/useCurrentManagment";

export default function Project() {
  const [hiddenLeft, setHiddenLeft] = useState<boolean>();

  function handleHidden() {
    setHiddenLeft((prev) => !prev);
  }
  const [active, setActive] = useState<string>();
  const { data: freelancer } = useCurrentManagment();
  const currentActive = freelancer?.find((el: Freelancer) => el.id === active);
  console.log(freelancer)
  if (!freelancer || freelancer.length === 0) {
    return <div>No freelancers found</div>;
  }
  return (
    <section className="flex bg-gray-db">
      <div
        className={`h-screen flex flex-col gap-10 bg-black p-2 ${
          hiddenLeft ? "w-[45px]" : "w-[250px] "
        } transition-all duration-300`}
      >
        <div className="pt-20 flex items-center justify-end">
          {hiddenLeft ? (
            <ArrowBigRightDash onClick={handleHidden} color="white" size={30} />
          ) : (
            <ArrowBigLeftDash onClick={handleHidden} color="white" size={30} />
          )}
        </div>

        <hr className="border-t-1 border-white/40" />
        {!hiddenLeft && (
          <div className="flex flex-col gap-6">
            <p className="text-white">Workspace:</p>
            <div className="space-y-2">
              {/* Przykładowe  */}
              {freelancer?.map((el: Freelancer) => (
                <div
                  onClick={() => setActive(el.id)}
                  key={el.id}
                  className={`${
                    currentActive === el.id ? "bg-neutral-600" : "bg-white/15"
                  }  p-2 rounded-md cursor-pointer`}
                >
                  <p className="text-white">{el.user.name} project</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 relative flex flex-col gap-2">
        <div className="w-full h-28 flex items-end">
          <p className="text-white"></p>
        </div>
        <div className="p-4">
          {freelancer && freelancer.length > 0 && (
            <TaskManager
              taskManagerOfferId={freelancer[0].taskManagerOfferId}
              freelencerId={freelancer[0].id}
            />
          )}
        </div>
        <div className="absolute bottom-0 items-center justify-center flex flex-col right-0 w-full h-14 border-t-[1px] border-white/10 z-[9999]">
          <div className="flex p-4 w-full gap-10  h-full items-center justify-end">
            <button className="link-small">Add a budget</button>
            <p className="text-white">
              Your budget: <span className="font-semibold">200 zł</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
