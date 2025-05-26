import useAuth from "../store/auth";
import { useQuery } from "@tanstack/react-query";

export function useFullUser() {
  const { isAuth } = useAuth();
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  return useQuery({
    queryKey: ["fullUser"],

    queryFn: async () => {
      const response = await fetch(`${API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Not authorized");
      return response.json();
    },
    enabled: isAuth,
  });
}