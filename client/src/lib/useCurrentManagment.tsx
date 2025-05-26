import { useQuery } from "@tanstack/react-query";

export function useCurrentManagment(){
    const API_URL = import.meta.env.VITE_API_URL;

    return useQuery({
        queryKey: ["current_managment"],

        queryFn: async () => {
            const res = await fetch(`${API_URL}/task/managment`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                  },
            });
            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }

            return res.json() || [];
        }
    })
}