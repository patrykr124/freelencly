import { useQuery } from "@tanstack/react-query";

export function useFullUser() {
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
  });
}