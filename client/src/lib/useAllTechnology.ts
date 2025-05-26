import { useQuery } from "@tanstack/react-query";

export function useAllTechnology(){
    return useQuery({
        queryKey: ["technology"],

        queryFn: async () => {
            const res = await fetch("http://localhost:3000/technology/all");
            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }

            return res.json();
        }
    })
}