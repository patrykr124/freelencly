import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTaskDesc(jobId: string | number, userId: string | undefined) {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      taskId,
      description,
    }: {
      taskId: string;
      description: string;
    }) => {
      const res = await fetch(`http://localhost:3000/task/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ taskId, description }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["allTaskByFreelencer", jobId, userId],
          });
      }
  });
}
