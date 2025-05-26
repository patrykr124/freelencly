import { useQuery } from "@tanstack/react-query";

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],

    queryFn: async () => {
      const res = await fetch("http://localhost:3000/job/all");
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
