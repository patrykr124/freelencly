import useAuth from "../store/auth";
import { useQuery } from "@tanstack/react-query";

export function useFullUser() {
  const { isAuth } = useAuth();
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["fullUser"],

    queryFn: async () => {
      const response = await fetch("http://localhost:3000/user/me", {
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