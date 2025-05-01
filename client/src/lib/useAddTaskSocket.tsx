import { TaskInput } from "@/types/box_services_props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

type TaskResponse = { error?: string } & { [key: string]: undefined };

export function useAddTaskSocket() {
  const queryClient = useQueryClient();

  return useMutation<TaskResponse,Error, TaskInput>({
    mutationFn: (taskData) =>
      new Promise((resolve, reject) => {
        socket.emit("add_task", taskData, (response: TaskResponse) => {
          if (response.error) reject(response.error);
          else resolve(response);
        });
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
