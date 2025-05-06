import useAuth from "../store/auth";
import closePopup from "../store/closePopup";
import { useMutation } from "@tanstack/react-query";

export function useGoogleLogin() {
  const logout = useAuth((state) => state.logout);
  const togglePopup = closePopup((state) => state.togglePopup);

  return useMutation({
    mutationFn: async (credential: string) => {
      const res = await fetch("http://localhost:3000/user/google-login", {
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
