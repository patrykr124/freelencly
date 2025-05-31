import { useQuery } from "@tanstack/react-query";

export function useJobs() {
  const API_URL = import.meta.env.VITE_API_URL;

  return useQuery({
    queryKey: ["jobs"],

    queryFn: async () => {
      const res = await fetch(`${API_URL}/job/all`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const data = res.json();
      if(!data){
        throw new Error("No data found");
      }
      return data
    },
  });
}
