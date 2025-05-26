import useAuth from "../store/auth";
import closePopup from "../store/closePopup";
import { useMutation } from "@tanstack/react-query";

export function useGoogleLoginFunction() {
  const logout = useAuth((state) => state.logout);
  const togglePopup = closePopup((state) => state.togglePopup);
  const API_URL = import.meta.env.VITE_API_URL;

  return useMutation({
    mutationFn: async (credential: string) => {
      const res = await fetch(`${API_URL}/user/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      if (res.status === 401) {
        logout();
        togglePopup(true);
        throw new Error("Unauthorize");
      }

      return res.json();
    },
  });
}
