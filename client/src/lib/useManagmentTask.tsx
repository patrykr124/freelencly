import closePopup from "../store/closePopup";
import { useMutation } from "@tanstack/react-query";

export function useManagmentTask(token: string) {
  const togglePopup = closePopup((state) => state.togglePopup);
  return useMutation({
    mutationFn: async (data: { userId: string }) => {
      const res = await fetch("http://localhost:3000/task/managment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if(res.status === 401){
        togglePopup(true);
      }

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });
}
