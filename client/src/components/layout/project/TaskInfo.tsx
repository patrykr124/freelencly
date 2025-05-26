import { useEffect, useRef, useState } from "react";
import { useUpdateTaskDesc } from "../../../lib/useUpdateTaskDesc";
import { useTaskInfo } from "../../../store/useTaskInfo";
import ReactQuill from "react-quill-new";
import useAuth from "../../../store/auth";


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
  const userId = useAuth((state) => state.user?.id);
  const { mutate: updateTaskDesc } = useUpdateTaskDesc(id, userId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState(desc);
  const [isLoading, setIsLoading] = useState(false);
  const closeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditedDesc(desc);
  }, [desc]);

  useEffect(() => {
    function handleCloseEditing(e: MouseEvent) {
      if (closeRef.current && !closeRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    }
    if (isEditing) {
      document.addEventListener("mousedown", handleCloseEditing);
    } else {
      document.removeEventListener("mousedown", handleCloseEditing);
    }
    return () => {
      document.removeEventListener("mousedown", handleCloseEditing);
    };
  }, [isEditing]);

  const handleDescEdit = async () => {
    setIsLoading(true);

    updateTaskDesc({
      taskId: id,
      description: editedDesc,
    });

    setIsEditing(false);

    setIsLoading(false);
  };

  function handleSubmit() {
    handleDescEdit();
  }
  function handleEdit() {
    setIsEditing((prev) => !prev);
  }

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
        className="w-5/6 md:w-[95%] h-3/4 text-white bg-gray-dark rounded-lg p-8 shadow-lg z-50 "
      >
        <div className="taskInfo grid grid-cols-2 h-full">
          <div className="grid col-span-1 border-r-[1px] p-2 border-r-white/25 h-full">
            <h3 className="text-3xl">{title}</h3>
            <p className="text-lg">{desc}</p>
            <div className="flex flex-col gap-2 ">
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
          <div
            ref={closeRef}
            className="flex flex-col gap-2 justify-between p-2 ml-4"
          >
            {isEditing ? (
              <>
                <ReactQuill
                  theme="snow"
                  className="text-sm w-full h-[350px] text-white"
                  value={editedDesc}
                  onChange={setEditedDesc}
                  readOnly={isLoading}
                />
              </>
            ) : (
              <div className="text-sm whitespace-pre-wrap w-full border-[1px] border-white/25 rounded-xl h-[420px] text-white  p-2">
                <p
                  dangerouslySetInnerHTML={{ __html: editedDesc }}
                  className="whitespace-pre-wrap  p-2"
                />
              </div>
            )}
            <div className="">
              {isEditing ? (
                <button onClick={handleSubmit} className="link-small w-full">
                  Save
                </button>
              ) : (
                <button onClick={handleEdit} className="link-small w-full">
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
