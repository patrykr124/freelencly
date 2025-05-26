import { useQuery } from "@tanstack/react-query";

export function useQueryJob(technology?: string ) {
  const API_URL = import.meta.env.VITE_API_URL;
  return useQuery({
    queryKey: ["job", technology],

    queryFn: async () => {
        
      const res = await fetch(`${API_URL}/job/all?technology=${encodeURIComponent(technology || "")}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
  });
}
