import useFreelencerWorkstore from "../store/useFreelencerWorkstore";
import TaskManager from "../components/layout/project/TaskManager";
import Button from "../components/UI/Buttons/Button";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { useState } from "react";

export default function Project() {
  const [hiddenLeft, setHiddenLeft] = useState<boolean>();
  const freelancer = useFreelencerWorkstore((state) => state.freelancers);
  console.log(freelancer[0]);
  const [activeId, setActiveId] = useState<string>();
  const active = activeId === freelancer[0]?.id;
  function handleHidden() {
    setHiddenLeft((prev) => !prev);
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
        {!hiddenLeft && (
          <div className="flex items-center justify-center">
            <Button color="bg-white w-full">Create a workspace</Button>
          </div>
        )}
        <hr className="border-t-1 border-white/40" />
        {!hiddenLeft && (
          <div className="flex flex-col gap-6">
            <p className="text-white">Workspace:</p>
            <div className="space-y-2">
              {/* Przykładowe  */}
              {freelancer?.map((el: any) => (
                <div
                  key={el.id}
                  className={`${
                    active === el.id ? "bg-neutral-600" : "bg-white/15"
                  }  p-2 rounded-md cursor-pointer`}
                >
                  <p className="text-white">{el.name} project</p>
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
          <TaskManager />
        </div>
        <div className="absolute wrapper bottom-0 items-center justify-center flex flex-col left-0 w-full h-14 border-t-[1px] border-white/10 z-[9999]">
          <div className="flex p-2 w-full gap-10  h-full items-center justify-end">
            <button className="link-small">Add a budget</button>
            <p className="text-white">Your budget: <span className="font-semibold">200 zł</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
