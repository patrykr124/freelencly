import { useQuery } from "@tanstack/react-query";

export function useCurrentJobs(id: string | number | undefined){
    return useQuery({
        queryKey: ["current_jobs", id],

        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/job/${id}`);
            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }

            return res.json();
        }
    })
}