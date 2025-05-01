import { useTaskInfo } from "../../../store/useTaskInfo";

export default function TaskInfo() {
  const open = useTaskInfo((state) => state.open);
  const closePopup = useTaskInfo((state) => state.closePopup);

  return (
    <div
      onClick={closePopup}
      id="task-info"
      className={`${
        open ? "fixed" : "hidden"
      } right-[50%] bottom-[50%] translate-x-1/2 translate-y-1/2 w-screen h-screen bg-black/50 flex items-center justify-center z-[99999999]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-3/4 h-3/4 bg-white rounded-lg p-4 shadow-lg z-50 "
      >
        <div className="taskInfo grid grid-cols-3 h-full">
          <div className="grid col-span-2 border-r-[1px] border-r-black/25 h-full">
            <h3 className="text-3xl">TaskTitle</h3>
            <p className="text-lg">TaskDescription</p>
            <div className="flex flex-col gap-2">
                <p>Priority: High</p>
                <p>Status: In Progress</p>
                <p>Due Date: 2025-05-01</p>
                <p>Created By: John Doe</p>
                <p>Assigned To: Jane Doe</p>
                <p>Freelencer: Jane Doe</p>
                <p>Task Manager Offer: Jane Doe</p>
                <p>Job: Jane Doe</p>
                <p>Category: Jane Doe</p>
                <p>Created At: Jane Doe</p>
            </div>
          </div>
          <div className=" ">123</div>
        </div>
      </div>
    </div>
  );
}
