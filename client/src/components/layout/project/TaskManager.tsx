import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import TaskInfo from "./TaskInfo";
import { useTaskInfo } from "../../../store/useTaskInfo";
import { useAddTaskSocket } from "../../../lib/useAddTaskSocket";
import useAuth from "../../../store/auth";
import { useAllTaskByFreelencer } from "../../../lib/useAllTaskByFreelencer";
import { useParams } from "react-router-dom";

const initialColumns = {
  todo: {
    name: "To do",
    items: [] as { id: string; content: string }[],
  },
  inprogress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

let idCounter = 0;

export default function TaskManager({
  freelencerId,
  taskManagerOfferId,
}: {
  freelencerId?: string | null;
  taskManagerOfferId?: string | null;
}) {
  const [columns, setColumns] = useState(initialColumns);
  const [taskInput, setTaskInput] = useState("");
  const {id} = useParams()
  const { data: task, isLoading, error } = useAllTaskByFreelencer( id ?? "");
  console.log(task)


  function mapTasksToColumns(tasks) {
    return {
      todo: {
        name: "To do",
        items: tasks.filter((t) => t.status === "todo").map((t) => ({
          id: t.id,
          content: t.title,
          ...t,
        })),
      },
      inprogress: {
        name: "In Progress",
        items: tasks.filter((t) => t.status === "in_progress").map((t) => ({
          id: t.id,
          content: t.title,
          ...t,
        })),
      },
      done: {
        name: "Done",
        items: tasks.filter((t) => t.status === "done").map((t) => ({
          id: t.id,
          content: t.title,
          ...t,
        })),
      },
    };
  }

  useEffect(() => {
    if (task && Array.isArray(task)) {
      setColumns(mapTasksToColumns(task));
    }
  }, [task]);


  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const sourceCol = columns[source.droppableId as keyof typeof columns];
    const destCol = columns[destination.droppableId as keyof typeof columns];
    const sourceItems = Array.from(sourceCol.items);
    const [removed] = sourceItems.splice(source.index, 1);
    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
      });
    } else {
      const destItems = Array.from(destCol.items);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems,
        },
      });
    }
  };

  const addTask = useAddTaskSocket();
  const userId = useAuth((state) => state.user?.id);
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    addTask.mutate({
      title: taskInput,
      description: "",
      status: "todo",
      priority: "low",
      createdById: userId,
      assignedToId: "",
      dueDate: new Date().toISOString(),
      freelencerId: freelencerId || "",
      taskManagerOfferId: taskManagerOfferId || "",
    });
    setTaskInput("");

    const newTask = { id: `task-${idCounter++}`, content: taskInput };
    setColumns((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        items: [newTask, ...prev.todo.items],
      },
    }));
    setTaskInput("");
  };

  const openPopup = useTaskInfo((state) => state.openPopup);

  return (
    <>
      <div className="w-full h-full">
        <form
          onSubmit={handleAddTask}
          className="mb-6 h-[45px] flex items-center justify-center gap-2 w-full max-w-2xl "
        >
          <input
            className="flex-1 rounded-md px-2 mb-1.5 py-1 border border-white/25 bg-gray-darkplaceholder:text-white text-white h-full focus:outline-none"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a task..."
          />
          <button
            type="submit"
            className="bg-black border-white/25 border min-w-[150px] cursor-pointer h-full text-white font-bold rounded-lg transition"
          >
            Add
          </button>
        </form>
        <div className="flex gap-2  min-h-[500px] rounded-xl">
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([colId, col]) => (
              <div
                key={colId}
                className="bg-gray-dark border-white/25 border rounded-xl p-4 flex-1 min-w-[200px] flex flex-col gap-2"
              >
                <h2 className="text-lg font-bold text-white ">{col.name}</h2>
                <hr className="border-white/40" />
                <Droppable droppableId={colId}>
                  {(provided, snapshot) => (
                    <div
                      onClick={openPopup}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex flex-col gap-3 min-h-[50px] ${
                        snapshot.isDraggingOver ? "bg-white" : ""
                      }`}
                    >
                      {col.items.map((item, idx) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={idx}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-md p-3 shadow text-black font-medium cursor-pointer transition border border-blue-200 ${
                                snapshot.isDragging
                                  ? "ring-2 ring-green-600"
                                  : ""
                              }`}
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        </div>
      </div>
      <TaskInfo />
    </>
  );
}
