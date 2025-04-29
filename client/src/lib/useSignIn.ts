import useAuth from "../store/auth";
import closePopup from "../store/closePopup";
import { useMutation } from "@tanstack/react-query";

type SingIn = {
  email: string;
  password: string;
};
type SingUp = {
  email: string;
  password: string;
  name: string;
};



export function useSignUp() {
  
  return useMutation({
    mutationFn: async ({ email, password,name }: SingUp) => {
      const res = await fetch("http://localhost:3000/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password ,name}),
      });

      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
  });
}



export function useSignIn() {
  const logout = useAuth((state) => state.logout);
  const togglePopup = closePopup((state) => state.togglePopup);
  return useMutation({
    mutationFn: async ({ email, password }: SingIn) => {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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


