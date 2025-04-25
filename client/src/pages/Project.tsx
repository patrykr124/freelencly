import TaskManager from "../components/layout/project/TaskManager";
import Button from "../components/UI/Buttons/Button";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { useState } from "react";

export default function Project() {
  const [hiddenLeft, setHiddenLeft] = useState<boolean>();
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
        <div className="flex items-center justify-center">
          <Button color="bg-white w-full">Create a workspace</Button>
        </div>
        <hr className="border-t-1 border-white/40" />
        <div className="flex flex-col gap-6">
          <p className="text-white">Workspace:</p>
          <div className="space-y-2">
            {/* Przykładowe  */}
            <div className="bg-neutral-500 p-2 rounded-md">
              <p className="text-white">Joshua project</p>
            </div>
            <div className="bg-gray-dark p-2 rounded-md">
              <p className="text-white">Joshua project</p>
            </div>
            <div className="bg-gray-dark p-2 rounded-md">
              <p className="text-white">Joshua project</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="w-full h-28 flex items-end">
          <p className="text-white"></p>
        </div>
        <div className="p-4">
          <TaskManager />
        </div>
      </div>
    </section>
  );
}
