import useAuth from "../store/auth";
import { useQuery } from "@tanstack/react-query";

export function useAllTaskByFreelencer(jobId: string | number | undefined) {
  const { user } = useAuth();
  const token = localStorage.getItem("token"); 

  return useQuery({
    queryKey: ["allTaskByFreelencer", jobId, user?.id],
    queryFn: async () => {
      if (!jobId || !user?.id) return;
      const response = await fetch(
        `http://localhost:3000/task/allTaskByFreelencer/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) return [];
      const data = await response.json();
      return data ?? [];
    },
  });
}
