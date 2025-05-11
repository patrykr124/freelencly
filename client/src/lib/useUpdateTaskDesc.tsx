
import { useMutation } from "@tanstack/react-query";

export function useUpdateTaskDesc() { 
    return useMutation({
        mutationFn: async({
            taskId,
            description
        } : {
            taskId: string,
            description: string
        }) => {
            const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            return res.json();
        }
    })
}