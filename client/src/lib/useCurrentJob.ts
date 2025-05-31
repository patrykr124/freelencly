import { useQuery } from "@tanstack/react-query";

export function useCurrentJobs(id: string | number | undefined){
    const API_URL = import.meta.env.VITE_API_URL;

    return useQuery({
        queryKey: ["current_jobs", id],

        queryFn: async () => {
            const res = await fetch(`${API_URL}/job/${id}`);
            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }

            return res.json();
        }
    })
}