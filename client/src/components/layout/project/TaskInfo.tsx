import { useState } from "react";
import { useUpdateTaskDesc } from "../../../lib/useUpdateTaskDesc";
import { useTaskInfo } from "../../../store/useTaskInfo";

export default function TaskInfo({
  id,
  title,
  priority,
  desc,
  status,
  createdAt,
}: {
  id: string;
  title: string;
  priority: string;
  desc: string;
  status: string;
  createdAt: string;
}) {
  const open = useTaskInfo((state) => state.open);
  const closePopup = useTaskInfo((state) => state.closePopup);
  const createdTime = createdAt.split("T")[0];
  const { mutate: updateTaskDesc } = useUpdateTaskDesc();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState(desc);
  const [isLoading, setIsLoading] = useState(false);

  const handleDescEdit = () => {
    updateTaskDesc({
      id,
      taskId: "",
      description: "",
    });
  };

  return (
    <div
      onClick={closePopup}
      id="task-info"
      className={`${
        open ? "fixed" : "hidden"
      } right-[50%] bottom-[50%] translate-x-1/2 translate-y-1/2 w-screen h-screen bg-black/80 flex items-center justify-center z-[99999999]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-5/6 h-3/4 text-white bg-gray-dark rounded-lg p-8 shadow-lg z-50 "
      >
        <div className="taskInfo grid grid-cols-3 h-full">
          <div className="grid col-span-2 border-r-[1px] border-r-white/25 h-full">
            <h3 className="text-3xl">{title}</h3>
            <p className="text-lg">{desc}</p>
            <div className="flex flex-col gap-2">
              <p>Priority: {priority}</p>
              <p>Status: {status}</p>
              <p>Due Date: 2025-05-01</p>
              <p>Created By: John Doe</p>
              <p>Assigned To: Jane Doe</p>
              <p>Freelencer: Jane Doe</p>
              <p>Task Manager Offer: Jane Doe</p>
              <p>Job: Jane Doe</p>
              <p>Category: Jane Doe</p>
              <p>Created At: {createdTime}</p>
            </div>
          </div>
          {isEditing ? (
            <textarea
              className="text-lg w-full bg-gray-800 text-white rounded p-2"
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              onBlur={handleDescEdit}
              autoFocus
              disabled={isLoading}
            />
          ) : (
            <p
              className="text-lg cursor-pointer"
              onClick={() => setIsEditing(true)}
              title="Kliknij, aby edytować"
            >
              {editedDesc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
