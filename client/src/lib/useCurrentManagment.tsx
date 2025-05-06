import { useQuery } from "@tanstack/react-query";

export function useCurrentManagment(){
    return useQuery({
        queryKey: ["current_managment"],

        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/task/managment`,{
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