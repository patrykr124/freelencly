import { useQuery } from "@tanstack/react-query";

export function useQueryJob(technology?: string ) {
  return useQuery({
    queryKey: ["job", technology],

    queryFn: async () => {
        
      const res = await fetch(`http://localhost:3000/job/all?technology=${encodeURIComponent(technology || "")}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
  });
}
