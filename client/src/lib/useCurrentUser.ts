import useAuth from "../store/auth";
import closePopup from "../store/closePopup";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser(token: string) {
  
  const logout = useAuth((state) => state.logout);
  const togglePopup = closePopup((state) => state.togglePopup);
  const API_URL = import.meta.env.VITE_API_URL;

  return useQuery({
    queryKey: ["currentUser"],
    enabled: !!token,
    queryFn: async () => {
      const res = await fetch(`${API_URL}/user/currentUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
