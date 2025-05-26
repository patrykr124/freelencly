import { useQuery } from "@tanstack/react-query";

export function useAllTechnology(){
    const API_URL = import.meta.env.VITE_API_URL;

    return useQuery({
        queryKey: ["technology"],

        queryFn: async () => {
            const res = await fetch(`${API_URL}/technology/all`);
            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }

            return res.json();
        }
    })
}