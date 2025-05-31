import useAuth from "../store/auth";
import closePopup from "../store/closePopup";
import { useMutation } from "@tanstack/react-query";



export function useUpdateUser(token: string) {
  const logout = useAuth((state) => state.logout);
  const togglePopup = closePopup((state) => state.togglePopup);
  const API_URL = import.meta.env.VITE_API_URL;

  return useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch(`${API_URL}/user/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (res.status === 401) {
        logout();
        togglePopup(true);
        throw new Error("Session expired");
      }

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
  });
}
